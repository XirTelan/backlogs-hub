import { getCurrentUserInfo, TokenData } from "@/entities/auth/utils/utils";

import { getBacklogItemsByQuery } from "@/shared/api/backlogItem";
import {
  createBacklog,
  getBacklogsByUserName,
  getBacklogsBaseInfoByUserName,
  getUserBacklogBySlug,
  updateBacklogsOrderById,
  isBacklogExist,
  isPrivateProfile,
  getBacklogsByFolder,
} from "@/shared/api/backlogs";
import { updateStat, updateUserFolders } from "@/shared/api/user";
import { generateSlug, sendMsg } from "@/shared/lib/utils";
import { BacklogCreationDTO, BacklogDTO, BacklogItemDTO } from "@/shared/model";
import {
  BacklogCreationSchema,
  BacklogFormSchema,
} from "@/shared/zodSchemas/zod";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const accessTypes = ["withData", "baseInfo", "exist", "byFolder"] as const;
type Types = (typeof accessTypes)[number];

const isType = (value: unknown): value is Types => {
  return accessTypes.some((valid) => valid === value);
};

const checkIsOwner = (
  curUser: TokenData | null,
  reqUser: string | undefined
) => {
  if (curUser && reqUser === undefined) return true;
  return curUser ? curUser.username === reqUser : false;
};

export async function GET(request: NextRequest) {
  const user = await getCurrentUserInfo();
  const userNameParam = request.nextUrl.searchParams.get("userName")?.trim();

  if (!userNameParam && !user) return sendMsg.error(`Params not provided`);

  const isOwner = checkIsOwner(user, userNameParam);
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
      isOwner
    );
  }
  return NextResponse.json(resultData, { status: 200 });
}

export async function POST(request: NextRequest) {
  const uknownData = await request.json();
  const { success, data } = BacklogFormSchema.safeParse(uknownData);
  if (!success) return sendMsg.error("Incorrect data", 400);

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
    if (!backlog.success)
      return sendMsg.error(backlog.message, 400, backlog.errors);
    await updateStat(user.id, "totalBacklogs");
    revalidatePath(`/user/${user.username}/backlogs`);
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
    return sendMsg.success(`Created`, 200);
  } catch (error) {
    throw new Error(`${error}`);
  }
}

const handleTypeGet = async (
  queryType: Types,
  resultData: GetResult,
  userName: string,
  backlogSlug: string | undefined,
  isOwner: boolean
) => {
  switch (queryType) {
    case "withData":
      {
        if (!backlogSlug) return sendMsg.error("Wrong parameters");

        resultData.backlog = await getUserBacklogBySlug(
          userName,
          backlogSlug,
          isOwner
        );

        if (!resultData.backlog || !resultData.backlog._id)
          return sendMsg.error("Backlog doesnt found");

        resultData.backlogData = await getBacklogItemsByQuery({
          backlogId: resultData.backlog._id,
        });
      }
      break;
    case "baseInfo":
      {
        resultData.backlog = await getBacklogsBaseInfoByUserName(
          userName,
          isOwner
        );
      }
      break;
    case "exist":
      {
        if (!backlogSlug) return sendMsg.error(`Params not provided`);
        resultData.backlog = await isBacklogExist(userName, backlogSlug);
      }
      break;
    case "byFolder":
      {
        resultData.backlog = await getBacklogsByFolder(userName);
      }
      break;
  }
};

type GetResult = {
  status?: number;
  backlog: Partial<BacklogDTO> | BacklogDTO[] | null | undefined;
  backlogData?: {
    items: Partial<BacklogItemDTO>[];
    totalCount: number;
  };
};
