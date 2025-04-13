import mongoose, { Schema } from "mongoose";
import Account from "./Account";
import { ConfigType, UserDB } from "@/shared/types";
const userConfigSchema = new mongoose.Schema<ConfigType>(
  {
    profileVisibility: { type: String, default: "public" },
    hideFolderNames: { type: Boolean, default: false },
    showEmptyFolders: { type: Boolean, default: true },
    canChangeUserName: { type: Boolean, default: false },
    pagination: { type: String, default: "bottom" },
    hideAsideNavBacklogs: { type: Boolean, default: false },
    categoryDesignation: { type: String, default: "color" },
    categoryBlockView: { type: String, default: "buttons" },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema<UserDB>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 60,
      index: { collation: { locale: "en", strength: 2 } },
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
    stats: {
      totalBacklogs: {
        type: Number,
        default: 0,
      },
      totalTemplates: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);
const User: mongoose.Model<UserDB> =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
