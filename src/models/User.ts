import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      maxlength: 24,
    },
    userClerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
