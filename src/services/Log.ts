"use server";
import dbConnect from "@/lib/dbConnect";
import Log from "@/models/Log";

export async function sendContactForm(params: FormData) {
  const data = Object.fromEntries(params);
  try {
    await dbConnect();
    await Log.create(data);
    return { isSuccess: true };
  } catch (error) {
    throw new Error("Error");
  }
}
