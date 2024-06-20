import {
  deleteBacklogItem,
  getBacklogItemById,
  putBacklogItem,
} from "@/services/backlogItem";
import { isAuthorizedBacklogOwner } from "@/services/backlogs";
import { BacklogItemDTO } from "@/types";
import { sendMsg } from "@/utils";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { itemId } }: { params: { itemId: string } },
) {
  try {
    const res = await getBacklogItemById(itemId);
    if (res.status === "error") return sendMsg.error(res.errors, 400);
    const { status: isAuthorize } = await isAuthorizedBacklogOwner(
      res.data.backlogId,
      "read",
    );
    if (!isAuthorize) return sendMsg.error("Not authorized", 401);
    return NextResponse.json({ status: "success", data: res.data });
  } catch (error) {
    sendMsg.error(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { itemId } }: { params: { itemId: string } },
) {
  try {
    const res = await authorizeAndProceed(itemId, () =>
      deleteBacklogItem(itemId),
    );
    if (res.status === "error") return res.data;
    const data = res.data as BacklogItemDTO;
    revalidateTag(`backloglist${data._id}`);
    return sendMsg.success(`Deleted ${data!.title}`, 202);
  } catch (error) {
    sendMsg.error(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params: { itemId } }: { params: { itemId: string } },
) {
  const data = await request.json();
  try {
    const res = await authorizeAndProceed(itemId, () => putBacklogItem(data));
    if (res.status === "error") return res.data;
    return sendMsg.success();
  } catch (error) {
    sendMsg.error(error);
  }
}

const authorizeAndProceed = async (
  itemId: string,
  action: (...args: unknown[]) => Promise<unknown>,
) => {
  const res = await getBacklogItemById(itemId);
  if (res.status === "error")
    return { status: "error", data: sendMsg.error(res.errors, 400) };
  const { status: isAuthorize } = await isAuthorizedBacklogOwner(
    res.data.backlogId,
    "edit",
  );
  if (!isAuthorize)
    return { status: "error", data: sendMsg.error("Not authorized", 401) };
  const data = await action();
  return { status: "ok", data: data };
};
