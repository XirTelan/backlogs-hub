import {
  deleteBacklogById,
  getBacklogById,
  updateBacklogById,
} from "@/services/backlogs";
import { cleanParamString, sendMsg } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const backlog = await getBacklogById(cleanParamString(id));
    if (backlog) {
      return NextResponse.json(backlog);
    } else {
      return NextResponse.json("Not Found", { status: 404 });
    }
  } catch (error) {
    return sendMsg.error(error);
  }
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    await updateBacklogById(data);
    return NextResponse.json("Success");
  } catch (error) {
    throw new Error(`${error}`);
  }
}
export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    await deleteBacklogById(id);
    return NextResponse.json("Success");
  } catch (error) {
    throw new Error(`${error}`);
  }
}
