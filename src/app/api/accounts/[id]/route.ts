import { getCurrentUserInfo } from "@/entities/auth/utils/utils";
import { deleteAccount } from "@/shared/api/account";
import { sendMsg } from "@/shared/lib/utils";
import { Account } from "@/shared/model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;

  const { id } = params;

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
