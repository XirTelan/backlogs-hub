import { getCurrentUserInfo } from "@/auth/utils";
import { getBacklogItemsByBacklogId } from "@/services/backlogItem";
import {
  createBacklog,
  getBacklogsByUserName,
  getBacklogsBaseInfoByUserName,
  getUserBacklogBySlug,
  updateBacklogsOrderById,
  isBacklogExist,
  isPrivateProfile,
} from "@/services/backlogs";
import { updateStat, updateUserFolders } from "@/services/user";
import { generateSlug, sendMsg } from "@/utils";
import { BacklogCreationSchema } from "@/zod";
import {
  BacklogCreationDTO,
  BacklogDTO,
  BacklogFormData,
  BacklogItemDTO,
} from "@/zodTypes";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const accessTypes = ["withData", "baseInfo", "exist"] as const;
type Types = (typeof accessTypes)[number];

const isType = (value: unknown): value is Types => {
  return accessTypes.some((valid) => valid === value);
};

export async function GET(request: NextRequest) {
  const user = await getCurrentUserInfo();
  const userNameParam = request.nextUrl.searchParams.get("userName")?.trim();
  const isOwner = user ? userNameParam === user.username : false;
  const userName = userNameParam ? userNameParam : user?.username;
  if (!userName) return sendMsg.error(`Params not provided`);
  if (await isPrivateProfile(userName, isOwner))
    return sendMsg.error(`Params not provided`, 403);
  const backlogSlug = request.nextUrl.searchParams
    .get("backlog")
    ?.trim()
    ?.toLowerCase();
  const queryType: unknown = request.nextUrl.searchParams.get("type");

  const resultData: GetResult = {
    backlog: undefined,
    backlogData: undefined,
  };
  if (isType(queryType)) {
    await handleTypeGet(queryType, resultData, userName, backlogSlug, isOwner);
  } else if (!backlogSlug) {
    resultData.backlog = await getBacklogsByUserName(userName, isOwner);
  } else {
    resultData.backlog = await getUserBacklogBySlug(
      userName,
      backlogSlug,
      isOwner,
    );
  }
  return NextResponse.json(resultData, { status: 200 });
}

export async function POST(request: NextRequest) {
  const data: BacklogFormData = await request.json();
  const user = await getCurrentUserInfo();
  
  if (!data.backlogTitle) return sendMsg.error("Incorrect data", 400);
  if (!user) return sendMsg.error("Not authorized", 401);

  const backlogData: BacklogCreationDTO = {
    ...data,
    userId: user.id,
    userName: user.username,
    slug: generateSlug(data.backlogTitle),
    totalCount: 0,
  };
  try {
    const parsedData = BacklogCreationSchema.safeParse(backlogData);
    if (!parsedData.success)
      return sendMsg.error(parsedData.error.message, 400);
    const backlog = await createBacklog(parsedData.data);
    if (!backlog.isSuccess)
      return sendMsg.error(backlog.message, 400, backlog.errors);
    await updateStat(user.id, "totalBacklogs");
    revalidatePath(`/user/${user.username}`);
    return NextResponse.json(backlog);
  } catch (error) {
    return sendMsg.error(error);
  }
}

export async function PATCH(request: NextRequest) {
  const data: { folders: string[]; backlogs: BacklogDTO[] } =
    await request.json();
  const user = await getCurrentUserInfo();
  if (!user) return sendMsg.error("", 401);
  if (data.backlogs.some((backlog) => backlog.userId !== user.id))
    return sendMsg.error("Validation error", 400);
  try {
    await Promise.all([
      updateUserFolders(user.username, data.folders),
      updateBacklogsOrderById(data.backlogs),
    ]);
    revalidatePath(`/user/${user.username}/backlogs`);
    return sendMsg.success(`Created`, 201);
  } catch (error) {
    throw new Error(`${error}`);
  }
}

const handleTypeGet = async (
  queryType: Types,
  resultData: GetResult,
  userName: string,
  backlogSlug: string | undefined,
  isOwner: boolean,
) => {
  switch (queryType) {
    case "withData": {
      if (!backlogSlug) return sendMsg.error("Wrong parameters");
      resultData.backlog = await getUserBacklogBySlug(
        userName,
        backlogSlug,
        isOwner,
      );
      resultData.backlogData = await getBacklogItemsByBacklogId(
        resultData?.backlog?._id,
      );
      break;
    }
    case "baseInfo": {
      resultData.backlog = await getBacklogsBaseInfoByUserName(
        userName,
        isOwner,
      );
      break;
    }
    case "exist": {
      if (!backlogSlug) return sendMsg.error(`Params not provided`);
      resultData.backlog = await isBacklogExist(userName, backlogSlug);
      break;
    }
  }
};

type GetResult = {
  status?: number;
  backlog: Partial<BacklogDTO> | BacklogDTO[] | null | undefined;
  backlogData?: Partial<BacklogItemDTO>[];
};
