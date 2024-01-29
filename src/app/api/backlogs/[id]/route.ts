import dbConnect from "@/lib/dbConnect";
import Backlog from "@/models/Backlog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const backlog = await Backlog.findOne({ userId: id });
    if (backlog) return NextResponse.json(backlog);
  } catch (error) {
    throw new Error("error");
  }
}
