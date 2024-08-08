import { routesList } from "@/data";
import Backlog from "@/models/Backlog";
import {
  deleteBacklogById,
  isAuthorizedBacklogOwner,
  updateBacklogById,
} from "@/services/backlogs";
import { updateStat } from "@/services/user";
import { cleanParamString, sendMsg } from "@/utils";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const backlogId = cleanParamString(id);
    const {
      success,
      data: backlog,
      ...rest
    } = await isAuthorizedBacklogOwner(backlogId, "read");
    if (!success) return sendMsg.error(rest.message, 403);

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
    const { success } = await isAuthorizedBacklogOwner(data._id, "edit");
    if (!success) return sendMsg.error("Not authorized", 403);
    const res = await updateBacklogById(data);
    if (!res.success) return sendMsg.error("Failed", 400);
    return sendMsg.success();
  } catch (error) {
    throw new Error(`${error}`);
  }
}
export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const { success, message } = await isAuthorizedBacklogOwner(id, "edit");
    if (!success) return sendMsg.error(message || "Not authorized", 403);

    const backlogToDelete = await Backlog.findById(id).select("userId").lean();
    const res = await deleteBacklogById(id);

    if (!res.success) return NextResponse.json("Error", { status: 500 });
    if (backlogToDelete?.userId)
      await updateStat(backlogToDelete?.userId, "totalBacklogs", "decrement");

    revalidatePath(routesList.manageBacklogs);
    return NextResponse.json("Success");
  } catch (error) {
    throw new Error(`${error}`);
  }
}
