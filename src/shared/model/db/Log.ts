import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    subject: String,
    description: String,
    level: Number,
  },
  { timestamps: true },
);

export const Log = mongoose.models.Log || mongoose.model("Log", LogSchema);

