import { getCurrentUserInfo } from "@/auth/utils";
import { getBacklogItemsByBacklogId } from "@/services/backlogItem";
import {
  createBacklog,
  getBacklogsByUserName,
  getBacklogsBaseInfoByUserName,
  getUserBacklogBySlug,
  updateBacklogsOrderById,
  isBacklogExist,
} from "@/services/backlogs";
import { updateUserFolders } from "@/services/user";
import { BacklogCreationDTO, BacklogItemDTO } from "@/types";
import { sendMsg } from "@/utils";
import { BacklogDTO, BacklogFormData } from "@/zodTypes";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const accessTypes = ["withData", "baseInfo", "exist"] as const;
type Types = (typeof accessTypes)[number];

const isType = (value: unknown): value is Types => {
  return accessTypes.some((valid) => valid === value);
};

export async function GET(request: NextRequest) {
  let userName = request.nextUrl.searchParams
    .get("userName")
    ?.trim()
    .toLocaleLowerCase();
  const backlogSlug = request.nextUrl.searchParams
    .get("backlog")
    ?.trim()
    ?.toLowerCase();
  const queryType: unknown = request.nextUrl.searchParams.get("type");

  if (!userName) {
    const user = await getCurrentUserInfo();
    if (!user || !user.username) {
      return sendMsg.error(`Params not provided`);
    }
    userName = user.username;
  }
  const resultData: GetResult = {
    backlog: undefined,
    backlogData: undefined,
  };
  if (isType(queryType)) {
    await handleTypeGet(queryType, resultData, userName, backlogSlug);
  } else if (!backlogSlug) {
    resultData.backlog = await getBacklogsByUserName(userName);
  } else {
    resultData.backlog = await getUserBacklogBySlug(userName, backlogSlug);
  }
  return NextResponse.json(resultData, { status: 200 });
}

export async function POST(request: NextRequest) {
  //todoMark task:AUTH1
  const data: BacklogFormData = await request.json();
  const user = await getCurrentUserInfo();
  if (!user) return sendMsg.error("", 401);
  const backlogData: BacklogCreationDTO = {
    ...data,
    userId: user.id,
    userName: user.username,
  };
  try {
    const backlog = await createBacklog(backlogData);
    revalidatePath(`/user/${user.username}/backlogs`);
    return NextResponse.json(backlog);
  } catch (error) {
    return sendMsg.error(error);
  }
}

export async function PATCH(request: NextRequest) {
  //todoMark task:AUTH1
  const data: { folders: string[]; backlogs: BacklogDTO[] } =
    await request.json();
  const user = await getCurrentUserInfo();
  if (!user) return sendMsg.error("", 401);
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
) => {
  switch (queryType) {
    case "withData": {
      if (!backlogSlug) return sendMsg.error("Wrong parameters");
      resultData.backlog = await getUserBacklogBySlug(userName, backlogSlug);
      resultData.backlogData = await getBacklogItemsByBacklogId(
        resultData?.backlog?._id,
      );
      break;
    }
    case "baseInfo": {
      resultData.backlog = await getBacklogsBaseInfoByUserName(userName);
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
