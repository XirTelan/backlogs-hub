import { createLogEntry } from "@/shared/api/dataLog";
import { sendMsg } from "@/shared/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const res = await createLogEntry(data);
    if (res.success) return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    return sendMsg.error(error);
  }
}
