import { UserDTO } from "@/zodTypes";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<UserDTO>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 60,
    },
    displayName: String,
    description: String,
    prodvider: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    folders: [String],
    config: {
      profileVisibility: { type: String, default: "public" },
      showEmptyFolders: { type: Boolean, default: true },
      canChangeUserName: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  },
);
const User: mongoose.Model<UserDTO> =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
