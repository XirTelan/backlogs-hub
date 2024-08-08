import dbConnect from "@/lib/dbConnect";
import Account from "@/models/Account";
import User from "@/models/User";
import { ResponseData } from "@/types";

export const deleteAccount = async (
  id: string,
): Promise<ResponseData<null>> => {
  try {
    await dbConnect();
    const res = await Account.findByIdAndDelete(id);
    const user = await User.findById(res?.userId);
    if (!user) return { success: false };
    user.accounts = [
      ...user.accounts.filter((account) => account.toString() !== id),
    ] as string[];

    await user.save();
    return { success: true, data: null };
  } catch (error) {
    throw new Error("Error");
  }
};
