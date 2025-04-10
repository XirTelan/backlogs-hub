import { getCurrentUserInfo } from "@/features/auth/utils";
import { getUserData } from "@/services/user";
import { sendMsg } from "@/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getCurrentUserInfo();
    if (!user) return sendMsg.error("Not Authorized", 401);
    const res = await getUserData(user.username, "folders");
    if (!res.success) return sendMsg.error(res.message);
    return NextResponse.json(
      {
        success: true,
        data: {
          username: user.username,
          folders: res.data.folders,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return sendMsg.error(error);
  }
}
