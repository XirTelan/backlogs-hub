"use server";
import dbConnect from "@/lib/dbConnect";
import Log from "@/models/Log";
import { LogDTO } from "@/zodTypes";



export async function sendContactForm(data: LogDTO) {
  try {
    await dbConnect();
    await Log.create(data);
    return { isSuccess: true };
  } catch (error) {
    throw new Error("Error");
  }
}
