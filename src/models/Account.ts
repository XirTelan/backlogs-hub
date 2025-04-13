import { AccountType } from "@/shared/types";
import mongoose, { Schema } from "mongoose";

const AccountSchema = new mongoose.Schema<AccountType>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  email: String,
  provider: String,
});
const Account: mongoose.Model<AccountType> =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);

export default Account;
