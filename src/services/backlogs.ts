"use server";
import dbConnect from "@/lib/dbConnect";
import Backlog from "@/models/Backlog";
import { BacklogCreateDTO, BacklogDTO } from "@/types";
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

export const getBacklogsTitleByUserName = async (userName: string) => {
  try {
    await dbConnect();
    const backlogs = await Backlog.find({ userName: userName }).select(
      "backlogTitle",
    );
    return backlogs;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getUserBacklogByTitle = async ({
  userName,
  backlogTitle,
}: {
  userName: string;
  backlogTitle: string;
}) => {
  try {
    await dbConnect();
    const backlogs = await Backlog.findOne({
      userName: userName,
      backlogTitle: backlogTitle,
    });
    return backlogs;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getBacklogsByUserName = async (userName: string) => {
  try {
    await dbConnect();
    const backlogs = await Backlog.find({ userName: userName });
    return backlogs;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const createBacklog = async (data: BacklogCreateDTO) => {
  try {
    await dbConnect();
    const backlog = new Backlog(data);
    await backlog.save();
    return NextResponse.json(backlog);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
