import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema(
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
    visability: String,
  },
  {
    timestamps: true,
  },
);
const Template =
  mongoose.models.Template || mongoose.model("Template", TemplateSchema);

export default Template;
