import { getCurrentUserInfo } from "@/entities/auth/utils/utils";
import { deleteTemplate } from "@/shared/api/template";
import { sendMsg } from "@/shared/lib/utils";
import { NextRequest } from "next/server";

export async function DELETE(
  _request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;

  const { id } = params;

  try {
    const user = await getCurrentUserInfo();
    const result = await deleteTemplate(id, user?.username);

    if (!result.success)
      return sendMsg.error(result.message, 400, result.errors);

    return sendMsg.success("Template deleted");
  } catch (error) {
    return sendMsg.error(error);
  }
}
