import mongoose from "mongoose";

const Field = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
});

const DataItem = new mongoose.Schema({
  name: {
    type: String,
  },
  value: {
    type: String,
  },
});

const BacklogItem = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  userFields: [DataItem],
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
    categories: [String],
    visibility: {
      type: String,
      default: "public",
    },
    data: [BacklogItem],
  },
  {
    timestamps: true,
  },
);
BacklogSchema.index({ userName: 1, backlogTitle: 1 }, { unique: true });
const Backlog =
  mongoose.models.Backlog || mongoose.model("Backlog", BacklogSchema);

export default Backlog;
