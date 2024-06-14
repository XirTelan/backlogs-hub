import { getCurrentUserInfo } from "@/auth/utils";
import { isUserNameExist, updateUserFolders } from "@/services/user";
import { sendMsg } from "@/utils";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { username } }: { params: { username: string } },
) {
  try {
    const res = await isUserNameExist(username);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return sendMsg.error(error);
  }
}

export async function PATCH(request: NextRequest) {
  const user = await getCurrentUserInfo();
  if (!user) return sendMsg.error("", 401);
  const data: string[] = await request.json();
  try {
    const res = await updateUserFolders(user.username, data);
    revalidatePath(`/manage-backlogs`);
    return NextResponse.json({ message: "updated", res }, { status: 200 });
  } catch (error) {
    return sendMsg.error(error);
  }
}
