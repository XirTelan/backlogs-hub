import mongoose from "mongoose";

const DataItemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  value: {
    type: String,
  },
});

const BacklogItemSchema = new mongoose.Schema({
  backlogId: { type: String, require: true },
  title: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  userFields: [DataItemSchema],
});

const BacklogItem =
  mongoose.models.BacklogItem || mongoose.model("Backlog", BacklogItemSchema);

export default BacklogItem;
