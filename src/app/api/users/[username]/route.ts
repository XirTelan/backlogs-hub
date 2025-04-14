import {
  clearCookiesToken,
  getCurrentUserInfo,
  TokenData,
} from "@/entities/auth/utils/utils";
import {
  deleteUser,
  isUserNameExist,
  updateUserFolders,
} from "@/shared/api/user";
import { sendMsg } from "@/shared/lib/utils";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/shared/lib/dbConnect";
import { User } from "@/entities/user";

type Params = Promise<{ username: string }>;
export async function GET(_request: NextRequest, props: { params: Params }) {
  const { username } = await props.params;

  try {
    const res = await isUserNameExist(username);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return sendMsg.error(error);
  }
}

export async function PATCH(request: NextRequest, props: { params: Params }) {
  const { username } = await props.params;

  const authCheck = await isAuthorized(username);
  if (!authCheck.success) return authCheck.response;
  const data: string[] = await request.json();
  try {
    const res = await updateUserFolders(username, data);
    revalidatePath(`/manage-backlogs`);
    return NextResponse.json({ message: "updated", res }, { status: 200 });
  } catch (error) {
    return sendMsg.error(error);
  }
}

export async function DELETE(request: NextRequest, props: { params: Params }) {
  const { username } = await props.params;

  try {
    const authCheck = await isAuthorized(username);
    if (!authCheck.success) return authCheck.response;
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
  if (!userToken) return { success: false, response: sendMsg.error("", 401) };
  if (userToken.username !== username)
    return { success: false, response: sendMsg.error("", 403) };
  return { success: true, userToken };
};

type IsAuth =
  | {
      success: false;
      response: NextResponse<{
        message: string;
        error: unknown;
      }>;
    }
  | {
      success: true;
      userToken: TokenData;
    };
