import {
  deleteBacklogById,
  getBacklogById,
  isAuthorizedBacklogOwner,
  updateBacklogById,
} from "@/services/backlogs";
import { cleanParamString, sendMsg } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const backlogId = cleanParamString(id);
    const isAuthorize = await isAuthorizedBacklogOwner(backlogId);
    if (!isAuthorize) return sendMsg.error("Not authorized", 403);
    const backlog = await getBacklogById(backlogId);
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
    const isAuthorize = await isAuthorizedBacklogOwner(data._id);
    if (!isAuthorize) return sendMsg.error("Not authorized", 403);
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
    const isAuthorize = await isAuthorizedBacklogOwner(id);
    if (!isAuthorize) return sendMsg.error("Not authorized", 403);
    await deleteBacklogById(id);
    return NextResponse.json("Success");
  } catch (error) {
    throw new Error(`${error}`);
  }
}
