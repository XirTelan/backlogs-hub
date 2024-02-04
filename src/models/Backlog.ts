import mongoose from "mongoose";

const Field = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
});
const Category = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  color: {
    type: String,
  },
});

const BacklogSchema = new mongoose.Schema(
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
    description: {
      type: String,
    },
    features: {
      type: String,
    },
    fields: [Field],
    categories: [Category],
    visibility: {
      type: String,
      default: "public",
    },
  },
  {
    timestamps: true,
  },
);
BacklogSchema.index({ userName: 1, backlogTitle: 1 }, { unique: true });
const Backlog =
  mongoose.models.Backlog || mongoose.model("Backlog", BacklogSchema);

export default Backlog;
