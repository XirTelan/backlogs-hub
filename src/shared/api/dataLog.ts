"use server";

import dbConnect from "@/shared/lib/dbConnect";
import { LogDTO } from "@/shared/model";
import { Log } from "../model";

export const createLogEntry = async (data: LogDTO) => {
  try {
    await dbConnect();
    await Log.create(data);
    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("Error");
  }
};
