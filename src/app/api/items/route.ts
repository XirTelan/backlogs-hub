import {
  addBacklogItem,
  getBacklogItemsData,
  getItemsGroupedByCategory,
} from "@/shared/services/api/backlogItem";

import { isAuthorizedBacklogOwner } from "@/shared/services/api/backlogs";
import { BacklogItemDTO } from "@/zodTypes";
import { sendMsg } from "@/utils";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { SortOrder } from "mongoose";

const availableSortOptions: Record<string, string> = {
  title: "title",
  updated: "updatedAt",
  created: "createdAt",
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const backlogId = searchParams.get("backlog");
  if (!backlogId) return sendMsg.error("Invalid params", 400);

  const {
    success,
    data: backlog,
    message,
  } = await isAuthorizedBacklogOwner(backlogId, "read");
  if (!success) return sendMsg.error(message, 401);

  const categories = searchParams.get("categories")?.split("-");
  let order: string | number | null = searchParams.get("order") ?? "asc";

  if (!isSortOrder(order)) {
    order = 1;
  }
  const searchOptions = {
    tags: searchParams.get("tags")?.split("-"),
    term: searchParams.get("search"),
    sort: availableSortOptions[
      searchParams.get("sort")?.toLocaleLowerCase() ?? "title"
    ],
    order: order as SortOrder,
    page: searchParams.get("page"),
    pageSize: searchParams.get("pageSize"),
  };
  try {
    let res;
    if (backlog.view === "Board") {
      res = await getItemsGroupedByCategory(backlog);
    } else {
      res = await getBacklogItemsData(categories, searchOptions, backlog._id);
    }
    if (!res.success) return sendMsg.error(res.errors);
    return NextResponse.json(res.data);
  } catch (error) {
    sendMsg.error(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: BacklogItemDTO = await request.json();
    const { success, message } = await isAuthorizedBacklogOwner(
      data.backlogId,
      "edit"
    );
    if (!success) return sendMsg.error(message, 401);

    const res = await addBacklogItem(data);
    if (!res.success) return sendMsg.error(res.erors);

    revalidateTag(`backloglist${data.backlogId}`);
    return NextResponse.json({ message: "created", res }, { status: 201 });
  } catch (error) {
    return sendMsg.error(error);
  }
}

const isSortOrder = (option: unknown): option is SortOrder => {
  if (typeof option === "number") {
    if (option === 1 || option === -1) return true;
    else return false;
  }

  if (typeof option === "string") {
    const availableValues = ["asc", "ascending", "desc", "descending"];

    if (availableValues.includes(option)) return true;
    else return false;
  }

  return false;
};
