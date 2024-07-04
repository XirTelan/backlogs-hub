import { getCurrentUserInfo } from "@/auth/utils";
import Account from "@/models/Account";
import { deleteAccount } from "@/services/account";
import { sendMsg } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const user = await getCurrentUserInfo();
    if (!user) return sendMsg.error("Not Authorized", 401);

    const account = await Account.findById(id);
    if (account?.userId.toString() !== user.id) return sendMsg.error("", 403);
    await deleteAccount(id);
    return NextResponse.json("Deleted", { status: 200 });
  } catch (error) {
    return sendMsg.error(error);
  }
}
