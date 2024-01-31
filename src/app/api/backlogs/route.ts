import dbConnect from "@/lib/dbConnect";
import Backlog from "@/models/Backlog";
import { getUserBacklogByTitle } from "@/services/backlogs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userName = request.nextUrl.searchParams.get("userName");
  const backlogTitle = request.nextUrl.searchParams.get("backlogTitle");
  const categories = request.nextUrl.searchParams.get("categories");
  console.log("route get");
  if (!userName || !backlogTitle)
    return NextResponse.json(
      { message: `Params not provided` },
      { status: 400 },
    );
  const data = await getUserBacklogByTitle({ userName, backlogTitle }).then(
    (data) => data.json(),
  );
  console.log("data", data);
  return NextResponse.json(data, { status: 200 });
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
