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
    
    if (!result.isSuccess)
      return sendMsg.error(result.message, 400, result.errors);

    return sendMsg.success("Template deleted");
  } catch (error) {
    return sendMsg.error(error);
  }
}
