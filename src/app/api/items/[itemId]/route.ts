import {
  deleteBacklogItem,
  getBacklogItemById,
  putBacklogItem,
  populateBacklogItem,
} from "@/shared/api/backlogItem";
import { isAuthorizedBacklogOwner } from "@/shared/api/backlogs";
import { sendMsg } from "@/shared/lib/utils";

import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ itemId: string }>;

export async function GET(request: NextRequest, props: { params: Params }) {
  const { itemId } = await props.params;
  const query = request.nextUrl.searchParams.get("type") ?? undefined;

  try {
    const isAuthorized = await authorize(itemId);
    if (!isAuthorized.success)
      return sendMsg.error(isAuthorized.message, isAuthorized.status ?? 400);
    let res;
    if (query === "populate") {
      res = await populateBacklogItem(itemId);
    } else {
      res = await getBacklogItemById(itemId);
    }
    if (!res.success) return sendMsg.error(res.errors);
    return NextResponse.json({ status: "success", data: res.data });
  } catch (error) {
    return sendMsg.error(error);
  }
}

export async function DELETE(_request: NextRequest, props: { params: Params }) {
  const { itemId } = await props.params;

  try {
    const res = await authorize(itemId);
    if (!res.success) return sendMsg.error(res.message, res.status);
    await deleteBacklogItem(itemId);
    revalidateTag(`backloglist${itemId}`);
    return sendMsg.success(`Deleted `, 202);
  } catch (error) {
    return sendMsg.error(error);
  }
}

export async function PUT(request: NextRequest, props: { params: Params }) {
  const { itemId } = await props.params;

  const data = await request.json();
  try {
    const res = await authorize(itemId);
    if (!res.success) return sendMsg.error(res.message, res.status ?? 400);
    putBacklogItem(data);
    return sendMsg.success();
  } catch (error) {
    return sendMsg.error(error);
  }
}

const authorize = async (itemId: string) => {
  const res = await getBacklogItemById(itemId);
  if (!res.success) return { success: false, message: res.errors, status: 400 };
  const { success } = await isAuthorizedBacklogOwner(
    res.data.backlogId,
    "edit"
  );
  if (!success)
    return { success: false, message: "Not authorized", status: 401 };

  return { success: true };
};
