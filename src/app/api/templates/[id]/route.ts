import { getBacklogById } from "@/services/backlogs";
import { cleanParamString, sendMsg } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params: { id } }: { params: { id: string } },
  ) {
    try {
      const backlog = await getBacklogById(cleanParamString(id));
      if (backlog) {
        return NextResponse.json(backlog);
      } else {
        return NextResponse.json("Not Found", { status: 404 });
      }
    } catch (error) {
      return sendMsg.error(error);
    }
  }
  