"use server";
import dbConnect from "@/lib/dbConnect";
import Backlog from "@/models/Backlog";

export const getBacklogsByUserId = async (id: string) => {
  try {
    await dbConnect();
    const backlogs = await Backlog.find({});
    return backlogs;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
