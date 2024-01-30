"use server";
import dbConnect from "@/lib/dbConnect";
import Backlog from "@/models/Backlog";
import { NextResponse } from "next/server";

export const getBacklogsByUserId = async (id: string) => {
  try {
    await dbConnect();
    const backlogs = await Backlog.findById(id);
    return NextResponse.json(backlogs);
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
    return NextResponse.json(backlogs);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getBacklogsByUserName = async (userName: string) => {
  try {
    await dbConnect();
    const backlogs = await Backlog.find({ userName: userName });
    return NextResponse.json(backlogs);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getBacklogsById = async (id: string) => {
  try {
    await dbConnect();
    const backlog = await Backlog.findById(id);
    if (backlog) return NextResponse.json(backlog);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
