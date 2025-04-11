import { getCurrentUserInfo } from "@/features/auth/utils/utils";
import { searchSteamGame } from "@/shared/api/steamSearch";
import { sendMsg } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUserInfo();
    if (!user) return sendMsg.error("Not authorized", 401);
    const searchRequest = request.nextUrl.searchParams.get("game") ?? "";
    const result = await searchSteamGame(searchRequest);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json("Cant find anything", { status: 400 });
  }
}
