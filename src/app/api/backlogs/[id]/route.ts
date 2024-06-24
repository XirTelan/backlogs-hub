import { routesList } from "@/data";
import {
  deleteBacklogById,
  isAuthorizedBacklogOwner,
  updateBacklogById,
} from "@/services/backlogs";
import { cleanParamString, sendMsg } from "@/utils";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const backlogId = cleanParamString(id);
    const { isSuccess, data: backlog } = await isAuthorizedBacklogOwner(
      backlogId,
      "read",
    );
    if (!isSuccess) return sendMsg.error("Not authorized", 403);
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
    const { isSuccess } = await isAuthorizedBacklogOwner(data._id, "edit");
    if (!isSuccess) return sendMsg.error("Not authorized", 403);
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
    const { isSuccess, message } = await isAuthorizedBacklogOwner(id, "edit");
    if (!isSuccess) return sendMsg.error(message || "Not authorized", 403);
    await deleteBacklogById(id);
    revalidatePath(routesList.manageBacklogs);
    return NextResponse.json("Success");
  } catch (error) {
    throw new Error(`${error}`);
  }
}
