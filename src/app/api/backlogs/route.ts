import Backlog from "@/models/Backlog";
import { getBacklogsByUserId } from "@/services/backlogs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  console.log("route get");
  if (!userId)
    return NextResponse.json({ message: `UserId is require` }, { status: 400 });
  const data = await getBacklogsByUserId(userId);
  console.log("data", data);
  return NextResponse.json(
    { message: `its work ${userId}`, data },
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  console.log(request.body);

  const backlog = new Backlog({});
  await backlog.save();

  return NextResponse.json({ message: `its work` }, { status: 200 });
}
