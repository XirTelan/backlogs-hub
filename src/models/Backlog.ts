import mongoose from "mongoose";

const fields = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
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
    backlogTitle: {
      type: String,
      required: true,
      unique: true,
    },
    fields: [fields],
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
