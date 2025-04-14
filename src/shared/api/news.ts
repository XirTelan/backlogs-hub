import dbConnect from "@/shared/lib/dbConnect";
import { News } from "../model/db";

export async function getNews() {
  try {
    await dbConnect();
    const news = await News.find().select("-_id").sort("-createdAt").lean();
    return news;
  } catch (error) {
    console.error(error);
    throw new Error("Get news error");
  }
}
