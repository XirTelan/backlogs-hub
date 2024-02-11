import {
  createBacklog,
  getBacklogsByUserName,
  getBacklogsBaseInfoByUserName,
  getUserBacklogBySlug,
  updateBacklogsOrderById,
} from "@/services/backlogs";
import { BacklogDTO } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userName = request.nextUrl.searchParams.get("userName");
  const backlogSlug = request.nextUrl.searchParams.get("backlog");
  const type = request.nextUrl.searchParams.get("type");
  let resultData;
  if (!userName) {
    return NextResponse.json(
      { message: `Params not provided` },
      { status: 400 },
    );
  }
  if (type && type === "baseInfo") {
    resultData = await getBacklogsBaseInfoByUserName(userName);
    return NextResponse.json(resultData, { status: 200 });
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
  try {
    const backlog = await createBacklog(data);
    return NextResponse.json({ message: "created", backlog }, { status: 201 });
  } catch (error) {
    throw new Error(`${error}`);
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
