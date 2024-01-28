import mongoose from "mongoose";

const BacklogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      maxlength: 24,
    },
    backlogName: {
      type: String,
      required: true,
      unique: true,
    },
    categories: [String],
    visibility: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Backlog =
  mongoose.models.Backlog || mongoose.model("Backlog", BacklogSchema);

export default Backlog;
