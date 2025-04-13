import { apiRoutesList, routesList } from "@/shared/constants/routesList";
import Backlog from "@/models/Backlog";
import {
  deleteBacklogById,
  isAuthorizedBacklogOwner,
  updateBacklogById,
} from "@/shared/api/backlogs";
import { updateStat } from "@/shared/api/user";
import { cleanParamString, sendMsg } from "@/shared/lib/utils";
import { BacklogDTOSchema } from "@/shared/zodSchemas/zod";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function GET(_request: NextRequest, props: { params: Params }) {
  const { id } = await props.params;

  try {
    const backlogId = cleanParamString(id);
    const {
      success,
      data: backlog,
      ...rest
    } = await isAuthorizedBacklogOwner(backlogId, "read");
    if (!success) return sendMsg.error(rest.message, 403);

    if (backlog) {
      return NextResponse.json(backlog);
    } else {
      return NextResponse.json("Not Found", { status: 404 });
    }
  } catch (error) {
    return sendMsg.error(error);
  }
}

export async function PUT(request: NextRequest) {
  const { data, success, error } = BacklogDTOSchema.partial().safeParse(
    await request.json()
  );
  if (!success || !data._id)
    return sendMsg.error(error ?? "Incorrect data", 400);

  try {
    const { success } = await isAuthorizedBacklogOwner(data._id, "edit");
    if (!success) return sendMsg.error("Not authorized", 403);
    const res = await updateBacklogById(data);
    if (!res.success) return sendMsg.error("Failed", 400);

    revalidatePath(`${apiRoutesList.backlogs}/${data._id}`);

    return sendMsg.success();
  } catch (error) {
    throw error;
  }
}
export async function DELETE(_request: NextRequest, props: { params: Params }) {
  const { id } = await props.params;

  try {
    const { success, message } = await isAuthorizedBacklogOwner(id, "edit");
    if (!success) return sendMsg.error(message || "Not authorized", 403);

    const backlogToDelete = await Backlog.findById(id).select("userId").lean();
    const res = await deleteBacklogById(id);

    if (!res.success) return NextResponse.json("Error", { status: 500 });
    if (backlogToDelete?.userId)
      await updateStat(backlogToDelete?.userId, "totalBacklogs", "decrement");

    revalidatePath(routesList.manageBacklogs);
    return NextResponse.json("Success");
  } catch (error) {
    throw new Error(`${error}`);
  }
}
