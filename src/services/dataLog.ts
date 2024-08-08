"use server";

import dbConnect from "@/lib/dbConnect";
import Log from "@/models/Log";
import { LogDTO } from "@/zodTypes";

export const createLogEntry = async (data: LogDTO) => {
  try {
    await dbConnect();
    await Log.create(data);
    return { success: true };
  } catch (error) {
    throw new Error("Error");
  }
};
