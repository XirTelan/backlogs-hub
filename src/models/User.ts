import { ConfigType, UserDTO } from "@/zodTypes";
import mongoose, { Schema } from "mongoose";
import Account from "./Account";
const userConfigSchema = new mongoose.Schema<ConfigType>(
  {
    profileVisibility: { type: String, default: "public" },
    hideFolderNames: { type: Boolean, default: false },
    showEmptyFolders: { type: Boolean, default: true },
    canChangeUserName: { type: Boolean, default: false },
  },
  { _id: false },
);

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
    provider: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    accounts: [
      {
        type: Schema.Types.ObjectId,
        ref: Account.modelName,
      },
    ],
    password: String,
    folders: [String],
    config: {
      type: userConfigSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const User: mongoose.Model<UserDTO> =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
