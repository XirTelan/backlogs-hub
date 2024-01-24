import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Required"],
    unique: true,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
