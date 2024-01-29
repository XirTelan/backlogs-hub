import dbConnect from "@/lib/dbConnect";
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
  const data = await request.json();
  try {
    await dbConnect();
    data.categories = data.categories.map(
      (item: { category: string }) => item.category,
    );
    console.log("data", data);

    const backlog = new Backlog(data);
    await backlog.save();
    return NextResponse.json({ message: "created", backlog }, { status: 201 });
  } catch (error) {
    throw new Error(`${error}`);
  }

  return NextResponse.json({ message: `its work` }, { status: 200 });
}
