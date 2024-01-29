"use server";
import dbConnect from "@/lib/dbConnect";
import Backlog from "@/models/Backlog";
import { NextResponse } from "next/server";

export const getBacklogsByUserId = async (id: string) => {
  try {
    await dbConnect();
    const backlogs = await Backlog.find({});
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
