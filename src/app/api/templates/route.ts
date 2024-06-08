import { getCurrentUserInfo } from "@/auth/utils";
import {
  createTemplate,
  getTemplates,
  getTemplatesByUsername,
} from "@/services/template";
import { sendMsg } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUserInfo();
    if (!currentUser) return sendMsg.error("", 401);
    const type = request.nextUrl.searchParams.get("filter");
    let resultData;
    switch (type) {
      case "my":
        {
          resultData = await getTemplatesByUsername(currentUser.username);
        }
        break;
      case "system":
        {
          resultData = await getTemplatesByUsername("system");
        }
        break;
      case "all":
      default:
        resultData = await getTemplates();
        break;
    }
    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    return sendMsg.error(error);
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUserInfo();
  if (!user) return sendMsg.error("", 401);
  const data = await request.json();
  try {
    const resultData = await createTemplate(data);
    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    return sendMsg.error(error);
  }
}
