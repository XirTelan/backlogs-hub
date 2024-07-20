"use server";
import dbConnect from "@/lib/dbConnect";
import Log from "@/models/Log";
import { LogDTO } from "@/zodTypes";

export const sendContactForm = async (data: LogDTO) => {
  try {
    await dbConnect();
    await Log.create(data);
    return { isSuccess: true };
  } catch (error) {
    throw new Error("Error");
  }
};
