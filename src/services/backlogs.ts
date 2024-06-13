"use server";
import { getCurrentUserInfo } from "@/auth/utils";
import dbConnect from "@/lib/dbConnect";
import Backlog from "@/models/Backlog";
import BacklogItem from "@/models/BacklogItem";
import { BacklogCreationDTO } from "@/types";
import { BacklogDTO } from "@/zodTypes";
import { getUserFolders } from "./user";

//GET SECTION
export const getBacklogById = async (
  id: string,
): Promise<BacklogDTO | null> => {
  try {
    await dbConnect();
    const backlog: BacklogDTO | null = await Backlog.findById(id).lean();
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
export const createBacklog = async (data: BacklogCreationDTO) => {
  try {
    await dbConnect();
    const isExist = await isBacklogExist(data.userName, data.slug);
    if (isExist) {
      return Promise.reject(new Error("Already exist"));
    }
    const backlog = new Backlog(data);
    await backlog.save();
    return backlog;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
//PUT/PATCH SECTION
export const updateBacklogsOrderById = async (data: BacklogDTO[]) => {
  try {
    await dbConnect();
    const updates: Promise<unknown>[] = [];
    data.forEach(async (backlog) => {
      updates.push(
        Backlog.findByIdAndUpdate(backlog._id, {
          order: backlog.order,
          folder: backlog.folder,
        }),
      );
    });
    await Promise.all(updates);
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
) => {
  const user = await getCurrentUserInfo();
  const backlog = await getBacklogById(backlogId);
  if (backlog?.visibility === "public" && method === "read") return true;
  if (backlog?.userId !== user?.id) return false;
  return true;
};
