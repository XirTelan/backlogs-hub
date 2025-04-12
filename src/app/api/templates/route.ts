import { getCurrentUserInfo } from "@/entities/auth/utils/utils";
import {
  createTemplate,
  getTemplates,
  getTemplatesByUser,
} from "@/shared/api/template";
import { sendMsg } from "@/utils";
import { TemplateCreateSchema } from "@/zod";
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
          resultData = await getTemplatesByUser(currentUser.id, "userid");
        }
        break;
      case "system":
        {
          resultData = await getTemplatesByUser("system");
        }
        break;
      case "all":
      default:
        resultData = await getTemplates(currentUser.username, true);
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
  data.author = user.username;
  data.userId = user.id;
  const templateData = TemplateCreateSchema.safeParse(data);
  if (!templateData.success) return sendMsg.error(templateData.error, 400);

  try {
    const resultData = await createTemplate(templateData.data);
    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    return sendMsg.error(error);
  }
}
