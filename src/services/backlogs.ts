"use server";
import { getCurrentUserInfo } from "@/auth/utils";
import dbConnect from "@/lib/dbConnect";
import Backlog from "@/models/Backlog";
import BacklogItem from "@/models/BacklogItem";
import { BacklogDTO, BacklogCreationDTO } from "@/zodTypes";
import { getUserFolders } from "./user";
import { BacklogCreationSchema, BacklogDTOSchema } from "@/zod";
import { z } from "zod";

//GET SECTION
export const getBacklogById = async (
  id: string,
): Promise<BacklogDTO | null> => {
  try {
    await dbConnect();
    const backlog: BacklogDTO | null = await Backlog.findById(id, {
      "categories._id": 0,
      "fields._id": 0,
    }).lean();
    if (!backlog) return null;
    backlog._id = backlog._id.toString();
    return backlog;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getBacklogsBaseInfoByUserName = async (
  userName: string,
): Promise<BacklogDTO[]> => {
  const user = await getCurrentUserInfo();
  try {
    await dbConnect();
    const options =
      user && user.username === userName
        ? { userName: userName }
        : {
            userName: userName,
            visibility: "public",
          };
    const backlogs: BacklogDTO[] = (await Backlog.find(options)
      .select(["slug", "userId", "backlogTitle", "folder", "order"])
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
  const [folders, data] = await Promise.all([
    getUserFolders(userName),
    getBacklogsBaseInfoByUserName(userName),
  ]);
  const hashMap: { [key: string]: BacklogDTO[] } = {};
  folders.forEach((folder) => (hashMap[folder] = []));
  for (const backlog of data) {
    backlog._id = backlog._id.toString();
    if (backlog.folder === undefined)
      await updateBacklogById({ _id: backlog._id, folder: folders[0] });
    hashMap[backlog.folder].push(backlog);
  }
  return hashMap;
};

export const getUserBacklogBySlug = async (
  userName: string,
  backlogSlug: string,
  isOwner: boolean,
): Promise<BacklogDTO | null> => {
  try {
    await dbConnect();
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
    const backlog: BacklogDTO | null = await Backlog.findOne(options, {
      "categories._id": 0,
      "fields._id": 0,
    }).lean();
    if (backlog) backlog._id = backlog._id.toString();
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
      return { status: "error", message: "Validation error", errors: error };
    const isExist = await isBacklogExist(data.userName, data.slug);
    if (isExist) {
      return { status: "error", message: "Already exist" };
    }
    const newBacklog = new Backlog(data);
    await newBacklog.save();
    return { status: "ok", data: newBacklog };
  } catch (error) {
    throw new Error(`${error}`);
  }
};
//PUT/PATCH SECTION
export const updateBacklogsOrderById = async (data: BacklogDTO[]) => {
  try {
    await dbConnect();
    const backlogs = z.array(BacklogDTOSchema).safeParse(data);
    if (!backlogs.success) return { status: "error", errors: backlogs.error };
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
    return { status: "ok" };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const updateBacklogById = async (data: Partial<BacklogDTO>) => {
  try {
    await dbConnect();
    await Backlog.updateOne({ _id: data._id }, { ...data });
  } catch (error) {
    throw new Error(`${error}`);
  }
};
//DELETE SECTION
export const deleteBacklogById = async (id: string) => {
  try {
    await dbConnect();
    await Backlog.deleteOne({ _id: id });
    await BacklogItem.deleteMany({ backlogId: id });
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
): Promise<
  { status: true; backlog: BacklogDTO } | { status: false; backlog: null }
> => {
  const [user, backlog] = await Promise.all([
    getCurrentUserInfo(),
    getBacklogById(backlogId),
  ]);
  if (!backlog) return { status: false, backlog: null };
  if (backlog.visibility === "public" && method === "read")
    return { status: true, backlog: backlog };
  if (backlog.userId !== user?.id) return { status: false, backlog: null };
  return { status: true, backlog: backlog };
};
