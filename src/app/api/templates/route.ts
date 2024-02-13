import { createTemplate, getTemplates } from "@/services/template";
import { sendErrorMsg } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const resultData = await getTemplates();
    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    return sendErrorMsg(error);
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const resultData = await createTemplate(data);
    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    return sendErrorMsg(error);
  }
}
