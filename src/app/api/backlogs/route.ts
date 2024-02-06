import {
  createBacklog,
  getUserBacklogByTitle,
} from "@/services/backlogs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userName = request.nextUrl.searchParams.get("userName");
  const backlogTitle = request.nextUrl.searchParams.get("backlogTitle");
  if (!userName || !backlogTitle)
    return NextResponse.json(
      { message: `Params not provided` },
      { status: 400 },
    );
  const data = await getUserBacklogByTitle({ userName, backlogTitle });
  return NextResponse.json(data, { status: 200 });
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
