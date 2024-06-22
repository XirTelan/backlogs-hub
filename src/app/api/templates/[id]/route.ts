import { getCurrentUserInfo } from "@/auth/utils";
import { deleteTemplate } from "@/services/template";
import { sendMsg } from "@/utils";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const user = await getCurrentUserInfo();
    const result = await deleteTemplate(id, user?.username);
    if (result.status === "ok") return sendMsg.success("Template deleted");
    else return sendMsg.error(result.message, 400, result.errors);
  } catch (error) {
    return sendMsg.error(error);
  }
}
