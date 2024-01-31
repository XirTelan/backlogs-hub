import { getBacklogById } from "@/services/backlogs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const backlog = await getBacklogById(id);
    if (backlog) return NextResponse.json(backlog);
  } catch (error) {
    throw new Error("error");
  }
}
