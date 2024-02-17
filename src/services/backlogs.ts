"use server";
import { getCurrentUserInfo } from "@/auth/utils";
import dbConnect from "@/lib/dbConnect";
import Backlog from "@/models/Backlog";
import BacklogItem from "@/models/BacklogItem";
import { BacklogDTO, BacklogFormData } from "@/types";

//GET SECTION
export const getBacklogById = async (id: string) => {
  try {
    await dbConnect();
    const backlog = await Backlog.findById(id);
    return backlog;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getBacklogsBaseInfoByUserName = async (userName: string) => {
  const user = await getCurrentUserInfo();
  try {
    await dbConnect();
    let backlogs;
    if (user && user.username === userName) {
      backlogs = await Backlog.find({ userName: userName })
        .select(["slug", "backlogTitle", "order"])
        .sort({
          order: 1,
        });
    } else {
      backlogs = await Backlog.find({
        userName: userName,
        visibility: "public",
      })
        .select(["slug", "backlogTitle", "order"])
        .sort({
          order: 1,
        });
    }
    return backlogs;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getUserBacklogBySlug = async ({
  userName,
  backlogSlug,
}: {
  userName: string;
  backlogSlug: string;
}): Promise<BacklogDTO> => {
  try {
    await dbConnect();
    const backlogs = await Backlog.findOne({
      userName: userName,
      slug: backlogSlug,
    });
    return backlogs;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getBacklogsByUserName = async (
  userName: string,
): Promise<BacklogDTO[]> => {
  try {
    await dbConnect();
    const backlogs = await Backlog.find({ userName: userName }).sort({
      order: 1,
    });
    return backlogs;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

//POST SECTION
export const createBacklog = async (data: BacklogFormData) => {
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
    data.forEach(async (backlog) => {
      await Backlog.findByIdAndUpdate(backlog._id, { order: backlog.order });
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const updateBacklogById = async (data: BacklogDTO) => {
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
