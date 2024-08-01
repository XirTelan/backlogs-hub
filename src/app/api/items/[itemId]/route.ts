import {
  deleteBacklogItem,
  getAndPopulateBacklogItemById,
  getBacklogItemById,
  putBacklogItem,
} from "@/services/backlogItem";
import { isAuthorizedBacklogOwner } from "@/services/backlogs";
import { sendMsg } from "@/utils";
import { BacklogItemDTO } from "@/zodTypes";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { itemId } }: { params: { itemId: string } },
) {
  try {
    const res = await getAndPopulateBacklogItemById(itemId);
    if (!res.isSuccess) return sendMsg.error(res.errors);
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
    if (!res.isSuccess) return sendMsg.error(res.data);
    const data = res.data as BacklogItemDTO;
    revalidateTag(`backloglist${data._id}`);
    return sendMsg.success(`Deleted ${data!.title}`, 202);
  } catch (error) {
    return sendMsg.error(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params: { itemId } }: { params: { itemId: string } },
) {
  const data = await request.json();
  try {
    const res = await authorizeAndProceed(itemId, () => putBacklogItem(data));
    if (!res.isSuccess) return sendMsg.error(res.data);
    return sendMsg.success();
  } catch (error) {
    return sendMsg.error(error);
  }
}

const authorizeAndProceed = async (
  itemId: string,
  action: (...args: unknown[]) => Promise<unknown>,
) => {
  const res = await getBacklogItemById(itemId);
  if (!res.isSuccess)
    return { isSuccess: false, data: sendMsg.error(res.errors, 400) };
  const { isSuccess } = await isAuthorizedBacklogOwner(
    res.data.backlogId,
    "edit",
  );
  if (!isSuccess)
    return { isSuccess: false, data: sendMsg.error("Not authorized", 401) };
  const data = await action();
  return { isSuccess: true, data: data };
};
