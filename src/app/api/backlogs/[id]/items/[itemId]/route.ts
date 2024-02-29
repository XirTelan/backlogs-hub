import { deleteBacklogItem, putBacklogItem } from "@/services/backlogItem";
import { sendMsg } from "@/utils";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params: { id, itemId } }: { params: { id: string; itemId: string } },
) {
  try {
    await deleteBacklogItem(itemId);
    revalidateTag(`backloglist${id}`);
    return NextResponse.json({ message: "Deleted" }, { status: 202 });
  } catch (error) {
    sendMsg.error(error);
  }
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    await putBacklogItem(data);
    return NextResponse.json("Success");
  } catch (error) {
    throw new Error(`${error}`);
  }
}
