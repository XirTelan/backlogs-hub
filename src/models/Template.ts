import { TemplateDTO } from "@/zodTypes";
import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema<TemplateDTO>(
  {
    templateTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    features: {
      type: String,
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
    author: String,
    visibility: String,
  },
  {
    timestamps: true,
  },
);
const Template: mongoose.Model<TemplateDTO> =
  mongoose.models.Template || mongoose.model("Template", TemplateSchema);

export default Template;
