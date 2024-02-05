import { deleteBacklogItem } from "@/services/backlogItem";
import { sendErrorMsg } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params: { itemId } }: { params: { id: string; itemId: string } },
) {
  try {
    await deleteBacklogItem(itemId);
    return NextResponse.json({ message: "Deleted" }, { status: 202 });
  } catch (error) {
    sendErrorMsg(error);
  }
}
