"use server";
import { getCurrentUserInfo } from "@/auth/utils";
import dbConnect from "@/lib/dbConnect";
import Backlog from "@/models/Backlog";
import BacklogItem from "@/models/BacklogItem";
import { BacklogDTO, BacklogCreationDTO } from "@/zodTypes";
import { getUserData } from "./user";
import { BacklogCreationSchema } from "@/zod";
import { z } from "zod";
import { ResponseData } from "@/types";

//GET SECTION
export const getBacklogById = async (
  id: string,
): Promise<BacklogDTO | null> => {
  try {
    await dbConnect();
    const backlog: BacklogDTO | null = await Backlog.findById(id, {
      "categories._id": 0,
    }).lean();
    if (!backlog) return null;
    backlog._id = backlog._id.toString();
    backlog.fields?.forEach((field) => (field._id = field._id?.toString()));
    return backlog;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getBacklogsBaseInfoByUserName = async (
  //task bhub40
  userName: string,
  isOwner: boolean,
): Promise<BacklogDTO[]> => {
  try {
    await dbConnect();
    const options = isOwner
      ? { userName: userName }
      : {
          userName: userName,
          visibility: "public",
        };
    const backlogs: BacklogDTO[] = (await Backlog.find(options)
      .select([
        "slug",
        "userId",
        "backlogTitle",
        "folder",
        "order",
        "totalCount",
      ])
      .sort({
        order: 1,
      })
      .lean()) as BacklogDTO[];

    return backlogs;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
export const getBacklogsByFolder = async (userName: string) => {
  try {
    const [currentUser, { data: user }] = await Promise.all([
      getCurrentUserInfo(),
      getUserData(userName, "folders"),
    ]);
    const isOwner = currentUser != null && currentUser.username === userName;
    const hashMap: { [key: string]: BacklogDTO[] } = {};

    if (!user || !user.folders) return hashMap;
    if (!isOwner && user.config?.profileVisibility === "private")
      return hashMap;

    const isHideFoldersName = !isOwner && user.config?.hideFolderNames;

    user.folders.forEach(
      (folder, indx) =>
        (hashMap[isHideFoldersName ? `Folder ${indx}` : folder] = []),
    );

    const updatePromises = [];
    const data = await getBacklogsBaseInfoByUserName(userName, isOwner);

    for (const backlog of data) {
      backlog._id = backlog._id.toString();
      if (isHideFoldersName)
        backlog.folder = `Folder ${user.folders.indexOf(backlog.folder)}`;
      if (backlog.folder === undefined || !hashMap[backlog.folder]) {
        backlog.folder = user.folders[0];
        if (isOwner) {
          updatePromises.push(
            updateBacklogById({ _id: backlog._id, folder: user.folders[0] }),
          );
        }
      }
      hashMap[backlog.folder].push(backlog);
    }
    await Promise.all(updatePromises);

    return hashMap;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const isPrivateProfile = async (userName: string, isOwner: boolean) => {
  const config = await getUserData(userName, "config");
  return (
    !isOwner &&
    (!config.isSuccess || config.data.config?.profileVisibility === "private")
  );
};

export const getUserBacklogBySlug = async (
  userName: string,
  backlogSlug: string,
  isOwner: boolean,
): Promise<BacklogDTO | null> => {
  try {
    await dbConnect();
    if (await isPrivateProfile(userName, isOwner)) return null;

    const options: Partial<BacklogDTO> = isOwner
      ? {
          userName: userName,
          slug: backlogSlug,
        }
      : {
          userName: userName,
          visibility: "public",
          slug: backlogSlug,
        };
    const backlog = await Backlog.findOne(options, {
      "categories._id": 0,
    }).lean();
    if (backlog) {
      backlog._id = backlog._id.toString();
      backlog.fields?.forEach((field) => {
        if (field._id) {
          field._id = field._id.toString();
        }
      });
    }
    return backlog;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getBacklogsByUserName = async (
  userName: string,
  isOwner: boolean,
): Promise<BacklogDTO[]> => {
  try {
    await dbConnect();
    if (await isPrivateProfile(userName, isOwner)) return [];

    const options: Partial<BacklogDTO> = isOwner
      ? {
          userName: userName,
        }
      : {
          userName: userName,
          visibility: "public",
        };
    const backlogs = await Backlog.find(options).sort({
      order: 1,
    });
    return backlogs;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

//POST SECTION
export const createBacklog = async (backlog: BacklogCreationDTO) => {
  try {
    await dbConnect();
    const { success, data, error } = BacklogCreationSchema.safeParse(backlog);
    if (!success)
      return { isSuccess: false, message: "Validation error", errors: error };
    const isExist = await isBacklogExist(data.userName, data.slug);
    if (isExist) {
      return { isSuccess: false, message: "Already exist" };
    }
    const newBacklog = new Backlog(data);
    await newBacklog.save();
    return { isSuccess: true, data: newBacklog };
  } catch (error) {
    throw new Error(`${error}`);
  }
};
//PUT/PATCH SECTION
export const updateBacklogsOrderById = async (data: Partial<BacklogDTO[]>) => {
  try {
    await dbConnect();
    const backlogs = z
      .array(
        z.object({
          _id: z.string(),
          userId: z.string(),
          folder: z.string(),
          order: z.number(),
        }),
      )
      .safeParse(data);
    if (!backlogs.success) return { isSuccess: false, errors: backlogs.error };
    const updates: Promise<unknown>[] = [];
    backlogs.data.forEach(async (backlog) => {
      updates.push(
        Backlog.findByIdAndUpdate(backlog._id, {
          order: backlog.order,
          folder: backlog.folder,
        }),
      );
    });
    await Promise.all(updates);
    return { isSuccess: true };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const updateBacklogById = async (data: Partial<BacklogDTO>) => {
  try {
    await dbConnect();
    const parsedData = z
      .object({ _id: z.string(), folder: z.string() })
      .safeParse(data);
    if (!parsedData.success) {
      console.error(parsedData.error);
      return { isSuccess: false };
    }

    const backlog = await Backlog.findById(data._id)
      .select("categories")
      .lean();

    const oldBacklogCats = backlog?.categories.map((cat) => cat.name);
    const oldCount = oldBacklogCats?.length;

    const updQueries: Promise<unknown>[] = [];
    data.categories?.forEach((cat, indx) => {
      if (!oldCount || indx > oldCount || cat.name == oldBacklogCats[indx])
        return;
      updQueries.push(
        BacklogItem.updateMany(
          { backlogId: backlog?._id, category: oldBacklogCats[indx] },
          { category: cat.name },
        ),
      );
    });

    await Promise.all([
      ...updQueries,
      Backlog.findByIdAndUpdate(data._id, parsedData.data),
    ]);

    return { isSuccess: true };
  } catch (error) {
    throw new Error(`${error}`);
  }
};
//DELETE SECTION
export const deleteBacklogById = async (id: string) => {
  try {
    await dbConnect();
    const res = await Backlog.deleteOne({ _id: id });
    if (res.deletedCount === 0) return { isSuccess: false };
    await BacklogItem.deleteMany({ backlogId: id });
    return { isSuccess: true };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

//HELPERS SECTION
export const isBacklogExist = async (userName: string, slug: string) => {
  try {
    await dbConnect();
    const isExist = await Backlog.exists({
      userName: userName,
      slug: slug,
    });
    return isExist;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const isAuthorizedBacklogOwner = async (
  backlogId: string,
  method: "read" | "edit",
): Promise<ResponseData<BacklogDTO>> => {
  const [user, backlog] = await Promise.all([
    getCurrentUserInfo(),
    getBacklogById(backlogId),
  ]);
  const isOwner = !!user && user.username === backlog?.userName;
  if (!backlog)
    return { isSuccess: false, data: null, message: "Backlog doesnt exist" };
  if (await isPrivateProfile(backlog.userName, isOwner))
    return { isSuccess: false };
  if (backlog.visibility === "public" && method === "read")
    return { isSuccess: true, data: backlog };
  if (backlog.userId !== user?.id) return { isSuccess: false, data: null };
  return { isSuccess: true, data: backlog };
};
