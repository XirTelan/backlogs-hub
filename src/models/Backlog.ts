import { BacklogDTO } from "@/zodTypes";
import mongoose from "mongoose";

const BacklogSchema = new mongoose.Schema<BacklogDTO>(
  {
    userId: {
      type: String,
      required: true,
      maxlength: 60,
    },
    userName: {
      type: String,
      required: true,
      maxlength: 60,
    },
    backlogTitle: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    folder: { type: String, required: true, default: "Default" },
    description: {
      type: String,
    },
    features: {
      type: String,
    },
    order: {
      type: Number,
    },
    fields: [
      {
        name: { type: String, required: true },
        type: { type: String, required: true },
        protected: Boolean,
      },
    ],
    categories: [
      {
        name: { type: String, required: true },
        color: { type: String, required: true },
        protected: Boolean,
      },
    ],
    visibility: {
      type: String,
      default: "public",
    },
    totalCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
BacklogSchema.index({ userName: 1, slug: 1 }, { unique: true });
const Backlog: mongoose.Model<BacklogDTO> =
  mongoose.models.Backlog ||
  mongoose.model<BacklogDTO>("Backlog", BacklogSchema);

export default Backlog;
