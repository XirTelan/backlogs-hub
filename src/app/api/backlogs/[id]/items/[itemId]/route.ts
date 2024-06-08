import { deleteBacklogItem, putBacklogItem } from "@/services/backlogItem";
import { isAuthorizedBacklogOwner } from "@/services/backlogs";
import { sendMsg } from "@/utils";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params: { id, itemId } }: { params: { id: string; itemId: string } },
) {
  try {
    const isAuthorize = await isAuthorizedBacklogOwner(id);
    if (isAuthorize) return sendMsg.error("Not authorized", 401);
    await deleteBacklogItem(itemId);
    revalidateTag(`backloglist${id}`);
    return sendMsg.success("Deleted", 202);
  } catch (error) {
    sendMsg.error(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const data = await request.json();
  try {
    const isAuthorize = await isAuthorizedBacklogOwner(id);
    if (isAuthorize) return sendMsg.error("Not authorized", 401);
    await putBacklogItem(data);
    return sendMsg.success();
  } catch (error) {
    sendMsg.error(error);
  }
}
