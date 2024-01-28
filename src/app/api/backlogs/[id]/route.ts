import { NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const userId = request.nextUrl.searchParams.get("userId");
  return NextResponse.json({ message: `its work ${userId}` }, { status: 200 });
}
