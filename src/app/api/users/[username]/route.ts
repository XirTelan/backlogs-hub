import { clearCookiesToken, getCurrentUserInfo, TokenData } from "@/auth/utils";
import {
  deleteUser,
  isUserNameExist,
  updateUserFolders,
} from "@/services/user";
import { sendMsg } from "@/utils";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

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

export async function PATCH(
  request: NextRequest,
  { params: { username } }: { params: { username: string } },
) {
  const authCheck = await isAuthorized(username);
  if (!authCheck.isSuccess) return authCheck.response;
  const data: string[] = await request.json();
  try {
    const res = await updateUserFolders(username, data);
    revalidatePath(`/manage-backlogs`);
    return NextResponse.json({ message: "updated", res }, { status: 200 });
  } catch (error) {
    return sendMsg.error(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { username } }: { params: { username: string } },
) {
  try {
    const authCheck = await isAuthorized(username);
    if (!authCheck.isSuccess) return authCheck.response;
    await dbConnect();

    if (!authCheck.userToken.id) return sendMsg.error("");
    const user = await User.findById(authCheck.userToken?.id);
    if (!user) return sendMsg.error("Cant perform action", 400);

    await deleteUser(authCheck.userToken.id);
    return clearCookiesToken(request);
  } catch (error) {
    return sendMsg.error(error);
  }
}

const isAuthorized = async (username: string): Promise<IsAuth> => {
  const userToken = await getCurrentUserInfo();
  if (!userToken) return { isSuccess: false, response: sendMsg.error("", 401) };
  if (userToken.username !== username)
    return { isSuccess: false, response: sendMsg.error("", 403) };
  return { isSuccess: true, userToken };
};

type IsAuth =
  | {
      isSuccess: false;
      response: NextResponse<{
        message: string;
        error: unknown;
      }>;
    }
  | {
      isSuccess: true;
      userToken: TokenData;
    };
