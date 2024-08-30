import dbConnect from "@/lib/dbConnect";
import Backlog from "@/models/Backlog";
import BacklogItem from "@/models/BacklogItem";
import { ResponseData } from "@/types";
import {
  BacklogItemCreationDTO,
  BacklogItemDTO,
  BacklogItemPopulated,
  BacklogItemPopUserField,
  BacklogItemWithSteamInfo,
} from "@/zodTypes";
import { NextResponse } from "next/server";
import { isAuthorizedBacklogOwner } from "./backlogs";
import { getSteamGameInfo } from "./steamSearch";
import { SortOrder } from "mongoose";
import {
  BacklogCreationSchema,
  BacklogItemCreationSchema,
  BacklogItemSchema,
} from "@/zod";
import { sendError } from "next/dist/server/api-utils";
import { sendMsg } from "@/utils";

export const getBacklogItemById = async (
  itemId: string,
): Promise<ResponseData<BacklogItemDTO>> => {
  try {
    await dbConnect();
    const backlogItem: BacklogItemDTO | null =
      await BacklogItem.findById(itemId).lean();
    if (!backlogItem) return { success: false, message: "doesnt exist" };
    backlogItem._id = backlogItem._id.toString();
    return { success: true, data: backlogItem };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getBacklogItemsByBacklogId = async (
  backlogId: string | undefined,
  sortOptions: {
    order: SortOrder;
    sort: string;
  } = {
    order: "asc",
    sort: "title",
  },
) => {
  if (!backlogId) return;
  try {
    await dbConnect();

    const backlogData: BacklogItemDTO[] = await BacklogItem.find(
      {
        backlogId: backlogId,
      },
      {
        userFields: 0,
      },
    )
      .sort({ [sortOptions.sort]: sortOptions.order })
      .lean();
    return backlogData.map((backlog) => ({
      ...backlog,
      _id: backlog._id.toString(),
    }));
  } catch (error) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
};

export const getBacklogItemsByQuery = async ({
  backlogId,
  categories,
  search,
  sortOptions,
}: {
  backlogId: string;
  categories: string[] | null | undefined;
  search: string | null;
  sortOptions: {
    order: SortOrder;
    sort: string;
  };
}) => {
  try {
    await dbConnect();
    const stage = BacklogItem.aggregate([{ $unset: ["userFields"] }]);
    stage.match({ backlogId: backlogId });
    let optRegexp;

    if (categories && categories.length > 0) {
      optRegexp = categories.map((value) => new RegExp("^" + value + "$", "i"));
      stage.match({ category: { $in: optRegexp } });
    }

    if (search) {
      const regex = new RegExp(
        search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i",
      );
      stage.match({ title: regex });
    }
    const result = await stage
      .sort({
        [sortOptions.sort]: sortOptions.order,
      })
      .exec();

    return result.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching backlog items:", error);
    throw error;
  }
};

export const addBacklogItem = async (data: BacklogItemCreationDTO) => {
  try {
    await dbConnect();

    const parsing = BacklogItemCreationSchema.safeParse(data);

    if (!parsing.success) return { success: false, erors: parsing.error };


    const backlogItem = await BacklogItem.create(parsing.data);

    await Backlog.findByIdAndUpdate(backlogItem.backlogId, {
      $inc: { totalCount: 1 },
    });

    return { success: true, data: backlogItem };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const putBacklogItem = async (data: BacklogItemDTO) => {
  try {
    await dbConnect();

    const parsing = BacklogItemSchema.safeParse(data);
    if (!parsing.success) return sendMsg.error(parsing.error);

    await BacklogItem.updateOne({ _id: data._id }, parsing.data);
    return NextResponse.json("ok");
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const deleteBacklogItem = async (id: string) => {
  try {
    await dbConnect();
    const backlogItem = await BacklogItem.findById(id);
    await Backlog.findByIdAndUpdate(backlogItem?.backlogId, {
      $inc: { totalCount: -1 },
    });
    const deleteResult = await backlogItem?.deleteOne();
    return deleteResult;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getBacklogItemsData = async (
  categories: string[] | null | undefined,
  searchOptions: {
    term: string | null | undefined;
    sort: string;
    order: SortOrder;
  },
  backlogId: string,
): Promise<ResponseData<BacklogItemDTO[]>> => {
  const { term, sort, order } = searchOptions;
  let backlogData;
  try {
    if (term || (categories && categories.length > 0)) {
      backlogData = await getBacklogItemsByQuery({
        backlogId: backlogId,
        categories: categories,
        search: term ? term : null,
        sortOptions: {
          sort: sort,
          order: order,
        },
      });
    } else {
      backlogData = await getBacklogItemsByBacklogId(backlogId, {
        order: order,
        sort: sort,
      });
    }
    if (!backlogData) {
      return {
        success: false,
        data: null,
        errors: {
          message: "The requested objects were not found.",
          details: "Please check your parameters and ensure they are correct",
        },
      };
    }
    return { success: true, data: backlogData };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

//type guard
function isSteamData(
  data: BacklogItemDTO | BacklogItemPopulated,
): data is BacklogItemWithSteamInfo {
  return typeof data.modifiersFields.steamAppId === "string";
}

export const getAndPopulateBacklogItemById = async (
  itemId: string,
): Promise<ResponseData<BacklogItemPopulated | BacklogItemWithSteamInfo>> => {
  const res = await getBacklogItemById(itemId);
  if (!res.success) return { success: false, errors: "Wrong ItemId" };

  const newFields = await populateUserFields(res.data);
  if (!newFields.success) return { success: false, errors: newFields.errors };

  if (res.data.modifiersFields?.steamAppId) {
    const steamInfo = await getSteamGameInfo(
      res.data.modifiersFields.steamAppId,
    );
    if (steamInfo.success && isSteamData(res.data)) {
      const backlogWithSteamData: BacklogItemWithSteamInfo = {
        ...res.data,
        steamData: steamInfo.data,
      };
      res.data = backlogWithSteamData;
    }
  }
  return {
    success: true,
    data: { ...res.data, userFields: newFields.data },
  };
};

const populateUserFields = async (
  backlogItem: BacklogItemDTO,
): Promise<ResponseData<BacklogItemPopUserField[]>> => {
  const backlogData = await isAuthorizedBacklogOwner(
    backlogItem.backlogId,
    "read",
  );
  if (!backlogData.success) return { success: false, errors: "Not Authorized" };

  const map = backlogData.data.fields?.reduce((acc, item) => {
    acc.set(item._id, item);
    return acc;
  }, new Map());

  const populatedFields = backlogItem.userFields.map((item) => {
    const curItem = map?.get(item.backlogFieldId);
    return {
      ...item,
      backlogFieldId: curItem.name || item.backlogFieldId,
      type: curItem.type,
    };
  });
  return { success: true, data: populatedFields };
};
