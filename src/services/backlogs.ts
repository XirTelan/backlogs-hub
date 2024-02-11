"use server";
import dbConnect from "@/lib/dbConnect";
import Backlog from "@/models/Backlog";
import { BacklogDTO, BacklogFormData } from "@/types";
import { NextResponse } from "next/server";

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
  try {
    await dbConnect();
    const backlogs = await Backlog.find({ userName: userName })
      .select(["slug", "backlogTitle", "order"])
      .sort({
        order: 1,
      });
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

export const createBacklog = async (data: BacklogFormData) => {
  try {
    await dbConnect();
    const backlog = new Backlog(data);
    await backlog.save();
    return NextResponse.json(backlog);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

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

export const deleteBacklogById = async (id: string) => {
  try {
    await dbConnect();
    await Backlog.deleteOne({ _id: id });
  } catch (error) {
    throw new Error(`${error}`);
  }
};
