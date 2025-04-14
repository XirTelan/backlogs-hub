import { NewsType } from "@/widgets/PatchnotesBlock/model/types";
import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: String,
    text: String,
    date: Date,
  },
  { timestamps: true }
);

export const News: mongoose.Model<NewsType> =
  mongoose.models.News || mongoose.model("News", NewsSchema);
