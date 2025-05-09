import { BacklogItemDTO } from "@/shared/model/";
import mongoose from "mongoose";

const DataItemSchema = new mongoose.Schema<{
  backlogFieldId: string;
  value: string;
}>(
  {
    backlogFieldId: String,
    value: {
      type: String,
    },
  },
  { _id: false }
);

const ModifiersFields = new mongoose.Schema(
  {
    steamAppId: String,
    order: Number,
  },
  { _id: false }
);
const BacklogItemSchema = new mongoose.Schema<BacklogItemDTO>(
  {
    backlogId: { type: String, require: true },
    title: {
      type: String,
      require: true,
    },
    tags: [String],
    category: {
      type: String,
      require: true,
    },
    userFields: [DataItemSchema],
    modifiersFields: ModifiersFields,
  },
  { timestamps: true }
);

BacklogItemSchema.index({ backlogId: 1, title: 1 }, { unique: true });

export const BacklogItem: mongoose.Model<BacklogItemDTO> =
  mongoose.models.BacklogItem ||
  mongoose.model("BacklogItem", BacklogItemSchema);
