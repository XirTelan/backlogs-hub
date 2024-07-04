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
    if (!user) return { isSuccess: false };
    console.log(user.accounts);
    user.accounts = [
      ...user.accounts.filter((account) => account.toString() !== id),
    ];
    await user.save();
    return { isSuccess: true, data: null };
  } catch (error) {
    throw new Error("Error");
  }
};
