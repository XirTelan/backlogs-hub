import dbConnect from "@/shared/lib/dbConnect";
import News from "@/models/News";

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
