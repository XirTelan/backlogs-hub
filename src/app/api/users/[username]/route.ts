import { updateUserFolders } from "@/services/user";
import { sendMsg } from "@/utils";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params: { username } }: { params: { username: string } },
) {
  //validation task AUTH1
  const data: string[] = await request.json();
  console.log(data);
  try {
    const res = await updateUserFolders(username, data);
    revalidatePath(`/manage-backlogs`);
    return NextResponse.json({ message: "updated", res }, { status: 200 });
  } catch (error) {
    return sendMsg.error(error);
  }
}
