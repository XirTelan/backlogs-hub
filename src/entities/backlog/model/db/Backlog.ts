import { BacklogDTO, ModifiersType } from "@/shared/model";
import mongoose, { Schema } from "mongoose";

const backlogModifiersSchema = new mongoose.Schema<ModifiersType>(
  {
    useSteamSearch: { type: Boolean, default: false },
    useSteamImport: { type: Boolean, default: false },
    useTagsSystem: { type: Boolean, default: false },
  },
  { _id: false }
);

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
    tags: [
      {
        name: { type: String, required: true },
        color: { type: String, required: true },
      },
    ],
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
    modifiers: backlogModifiersSchema,
    order: {
      type: Number,
    },
    fields: [
      {
        name: { type: String, required: true },
        type: { type: String, required: true },
        data: Schema.Types.Mixed,
        protected: Boolean,
      },
    ],
    categories: [
      {
        name: { type: String, required: true },
        color: { type: String, required: true },
        order: { type: Number },
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
    view: {
      type: String,
      required: true,
      default: "Default",
    },
  },
  {
    timestamps: true,
  }
);
BacklogSchema.index({ userName: 1, slug: 1 }, { unique: true });
export const Backlog: mongoose.Model<BacklogDTO> =
  mongoose.models.Backlog ||
  mongoose.model<BacklogDTO>("Backlog", BacklogSchema);
