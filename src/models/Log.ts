import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  type: String,
  message: String,
  level: Number,
});

const Log = mongoose.models.Log || mongoose.model("Log", LogSchema);

export default Log;
