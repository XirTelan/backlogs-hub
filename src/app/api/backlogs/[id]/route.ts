import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  request.nextUrl.searchParams.get("");
  return NextResponse.json(data);
}
