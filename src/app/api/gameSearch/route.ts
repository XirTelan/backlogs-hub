import getHLTBGame from "@/services/hltbGames";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchGame = request.nextUrl.searchParams.get("game") ?? "";
  const data = await getHLTBGame(searchGame);
  return NextResponse.json(data);
}
