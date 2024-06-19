import {
  deleteBacklogItem,
  getBacklogItemById,
  putBacklogItem,
} from "@/services/backlogItem";
import { isAuthorizedBacklogOwner } from "@/services/backlogs";
import { sendMsg } from "@/utils";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { itemId } }: { params: { itemId: string } },
) {
  try {
    console.log("well 1");
    const res = await getBacklogItemById(itemId);
    if (res.status === "error") return sendMsg.error(res.errors, 400);
    console.log("well 2");
    const isAuthorize = await isAuthorizedBacklogOwner(
      res.data.backlogId,
      "read",
    );
    if (!isAuthorize) return sendMsg.error("Not authorized", 401);
    console.log("well 3");
    return NextResponse.json({ status: "success", data: res.data });
  } catch (error) {
    sendMsg.error(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { id, itemId } }: { params: { id: string; itemId: string } },
) {
  try {
    const isAuthorize = await isAuthorizedBacklogOwner(id, "edit");
    if (!isAuthorize) return sendMsg.error("Not authorized", 401);
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
    const isAuthorize = await isAuthorizedBacklogOwner(id, "edit");
    if (!isAuthorize) return sendMsg.error("Not authorized", 401);
    await putBacklogItem(data);
    return sendMsg.success();
  } catch (error) {
    sendMsg.error(error);
  }
}
