import { addBacklogItem, getBacklogItemsData } from "@/services/backlogItem";

import { isAuthorizedBacklogOwner } from "@/services/backlogs";
import { BacklogItemDTO } from "@/zodTypes";
import { sendMsg } from "@/utils";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const backlogId = searchParams.get("backlog");
  if (!backlogId) return sendMsg.error("Invalid params", 400);

  const { success } = await isAuthorizedBacklogOwner(backlogId, "read");
  if (!success) return sendMsg.error("Doesnt have permission", 401);

  const categories = searchParams.get("categories")?.split("-");
  const search = searchParams.get("search");
  try {
    const res = await getBacklogItemsData(categories, search, backlogId);
    if (!res.success) return sendMsg.error(res.errors);

    return NextResponse.json(res.data);
  } catch (error) {
    sendMsg.error(error);
  }
}

export async function POST(request: NextRequest) {
  const data: BacklogItemDTO = await request.json();
  try {
    const res = await addBacklogItem(data);
    revalidateTag(`backloglist${data.backlogId}`);
    return NextResponse.json({ message: "created", res }, { status: 201 });
  } catch (error) {
    return sendMsg.error(error);
  }
}
