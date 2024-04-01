import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    folders: [String],
    profileVisibility: { type: String, default: "public" },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
