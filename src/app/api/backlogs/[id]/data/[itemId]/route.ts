import { deleteBacklogItem } from "@/services/backlogItem";
import { sendErrorMsg } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params: { itemId } }: { params: { id: string; itemId: string } },
) {
  console.log("delete", itemId);
  try {
    const res = await deleteBacklogItem(itemId);
    return NextResponse.json({ message: "Deleted", res }, { status: 202 });
  } catch (error) {
    sendErrorMsg(error);
  }
}
