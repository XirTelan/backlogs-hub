import dbConnect from "@/shared/lib/dbConnect";

import { ResponseData } from "@/shared/model/";
import { Account, User } from "../model/db";

export const deleteAccount = async (
  id: string
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
    console.error(error);
    throw new Error("Error");
  }
};
