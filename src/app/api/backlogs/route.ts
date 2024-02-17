import { getCurrentUserInfo } from "@/auth/utils";
import {
  createBacklog,
  getBacklogsByUserName,
  getBacklogsBaseInfoByUserName,
  getUserBacklogBySlug,
  updateBacklogsOrderById,
  isBacklogExist,
} from "@/services/backlogs";
import { BacklogDTO } from "@/types";
import { sendErrorMsg } from "@/utils";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let userName = request.nextUrl.searchParams
    .get("userName")
    ?.toLocaleLowerCase();
  const backlogSlug = request.nextUrl.searchParams
    .get("backlog")
    ?.toLowerCase();
  const type = request.nextUrl.searchParams.get("type")?.toLowerCase();
  let resultData;
  if (!userName) {
    const user = { username: "user" }; //stub;
    if (!user || !user.username) {
      return NextResponse.json(
        { message: `Params not provided` },
        { status: 400 },
      );
    }
    userName = user.username;
  }
  if (type) {
    switch (type) {
      case "baseInfo":
        resultData = await getBacklogsBaseInfoByUserName(userName);
        return NextResponse.json(resultData, { status: 200 });
      case "exist":
        if (!backlogSlug)
          return NextResponse.json(
            { message: `Params not provided` },
            { status: 400 },
          );
        resultData = await isBacklogExist(userName, backlogSlug);
        return NextResponse.json(resultData, { status: 200 });
    }
  }
  if (!backlogSlug) {
    resultData = await getBacklogsByUserName(userName);
  } else {
    resultData = await getUserBacklogBySlug({ userName, backlogSlug });
  }
  return NextResponse.json(resultData, { status: 200 });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const user = await getCurrentUserInfo();
  if (user) {
    data.userId = user.id;
    data.userName = user.username;
  }
  try {
    const backlog = await createBacklog(data);
    revalidatePath(`/user/${data.username}/backlogs`);
    return NextResponse.json({ message: "created", backlog }, { status: 201 });
  } catch (error) {
    return sendErrorMsg(error);
  }
}

export async function PATCH(request: NextRequest) {
  const data: BacklogDTO[] = await request.json();
  try {
    await updateBacklogsOrderById(data);
    return NextResponse.json({ message: "created" }, { status: 201 });
  } catch (error) {
    throw new Error(`${error}`);
  }
}
