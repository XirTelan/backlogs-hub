import { getCurrentUserInfo } from "@/auth/utils";
import { getUserFolders } from "@/services/user";
import { sendMsg } from "@/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getCurrentUserInfo();
    if (!user) return sendMsg.error("Not Authorized", 401);
    const res = await getUserFolders(user.username);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return sendMsg.error(error);
  }
}
