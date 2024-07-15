import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: String,
    text: String,
    date: Date,
  },
  { timestamps: true },
);

const News = mongoose.models.News || mongoose.model("News", NewsSchema);

export default News;
