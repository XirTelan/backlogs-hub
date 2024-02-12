import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema(
  {
    templateName: {
      type: String,
      required: true,
    },
    backlogTitle: {
      type: String,
      required: true,
    },
    slug: {
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
      },
    ],
    categories: [
      {
        name: { type: String, required: true },
        color: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);
const Template =
  mongoose.models.Template || mongoose.model("Template", TemplateSchema);

export default Template;
