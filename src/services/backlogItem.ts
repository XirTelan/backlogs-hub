import dbConnect from "@/lib/dbConnect";
import Backlog from "@/models/Backlog";
import BacklogItem from "@/models/BacklogItem";
import { ResponseData } from "@/types";
import {
  BacklogDTO,
  BacklogItemCreationDTO,
  BacklogItemDTO,
  BacklogItemPopulated,
  BacklogItemPopUserField,
  BacklogItemWithSteamInfo,
} from "@/zodTypes";
import { getBacklogById } from "./backlogs";
import { getSteamGameInfo } from "./steamSearch";
import { Document, Query, SortOrder, UpdateWriteOpResult } from "mongoose";
import { BacklogItemCreationSchema, BacklogItemSchema } from "@/zod";

export const getBacklogItemById = async (
  itemId: string
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

export const getBacklogItemsByQuery = async ({
  backlogId,
  categories,
  tags,
  search,
  pagination,
  sortOptions = { order: "asc", sort: "title" },
}: {
  backlogId: string;
  categories?: string[] | null;
  tags?: string[] | null;
  search?: string | null;
  pagination?: {
    page: number;
    pageSize: number;
  };
  sortOptions?: {
    order: SortOrder;
    sort: string;
  };
}) => {
  try {
    await dbConnect();
    const stage = BacklogItem.aggregate([
      { $match: { backlogId: backlogId } },
      { $unset: ["userFields"] },
    ]);
    let optRegexp;

    if (categories && categories.length > 0) {
      optRegexp = categories.map((value) => new RegExp("^" + value + "$", "i"));
      stage.match({ category: { $in: optRegexp } });
    }

    if (tags && tags.length > 0) {
      stage.match({ tags: { $in: tags } });
    }

    if (search) {
      const regex = new RegExp(
        search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );
      stage.match({ title: regex });
    }

    stage.sort({
      [sortOptions.sort]: sortOptions.order,
    });

    if (pagination) {
      const { page, pageSize } = pagination;
      stage.facet({
        metadata: [{ $count: "totalCount" }],
        data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
      });
    } else {
      stage.facet({
        metadata: [{ $count: "totalCount" }],
        data: [],
      });
    }
    const result = await stage.exec();

    return {
      items: result[0]?.data ?? [],
      totalCount: result[0]?.metadata[0]?.totalCount ?? 0,
    };
  } catch (error) {
    console.error("Error fetching backlog items:", error);
    throw error;
  }
};

export const getItemsGroupedByCategory = async (backlog: BacklogDTO) => {
  try {
    await dbConnect();
    const hashMap = new Map<
      string,
      { order: number; items: BacklogItemDTO[] }
    >();

    backlog.categories.sort((a, b) => a.order - b.order);
    backlog.categories.forEach((category) =>
      hashMap.set(category.name, { order: category.order, items: [] })
    );
    const data = await BacklogItem.find({ backlogId: backlog._id })
      .sort("modifiersFields.order")
      .lean();
    if (!data) return { success: false, errors: "doesnt find" };

    data.forEach((item) => {
      item._id = item._id.toString();
      hashMap.get(item.category)?.items.push(item);
    });
    return { success: true, data: Object.fromEntries(hashMap) };
  } catch (error) {
    console.error("Error:", error);
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

export const updateMany = async (backlogId: string, data: BacklogItemDTO[]) => {
  try {
    await dbConnect();
    const updates: Query<UpdateWriteOpResult, Document>[] = [];
    data.forEach((item) => {
      const parsing = BacklogItemSchema.partial().safeParse(item);
      if (item.backlogId != backlogId) return;
      if (!parsing.success) return;
      updates.push(
        BacklogItem.updateOne({ _id: parsing.data._id }, parsing.data)
      );
    });
    await Promise.all(updates);

    return { success: true, data: true };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
export const putBacklogItem = async (
  data: BacklogItemDTO
): Promise<ResponseData<boolean>> => {
  try {
    await dbConnect();
    const parsing = BacklogItemSchema.partial().safeParse(data);
    if (!parsing.success) return { success: false, errors: parsing.error };
    const res = await BacklogItem.updateOne({ _id: data._id }, parsing.data);
    if (res.acknowledged) return { success: true, data: true };
    else return { success: false };
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
    page?: string | null;
    pageSize?: string | null;
    tags?: string[] | null;
  },
  backlogId: string
): Promise<ResponseData<{ totalCount: number; items: BacklogItemDTO[] }>> => {
  const { term, tags, sort, order, page, pageSize } = searchOptions;
  let backlogData;
  try {
    backlogData = await getBacklogItemsByQuery({
      backlogId,
      categories,
      tags,
      search: term ? term : null,
      sortOptions: {
        sort,
        order,
      },
      pagination: page
        ? {
            page: Number(page),
            pageSize: Number(pageSize ?? "50"),
          }
        : undefined,
    });
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
  data: BacklogItemDTO | BacklogItemPopulated
): data is BacklogItemWithSteamInfo {
  return typeof data.modifiersFields.steamAppId === "string";
}

export const populateBacklogItem = async (
  itemId: string
): Promise<ResponseData<BacklogItemPopulated | BacklogItemWithSteamInfo>> => {
  const res = await getBacklogItemById(itemId);
  if (!res.success) return { success: false, errors: "Wrong ItemId" };

  const newFields = await populateUserFields(res.data);

  if (!newFields.success) return { success: false, errors: newFields.errors };
  if (res.data.modifiersFields?.steamAppId) {
    const steamInfo = await getSteamGameInfo(
      res.data.modifiersFields.steamAppId
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
  backlogItem: BacklogItemDTO
): Promise<ResponseData<BacklogItemPopUserField[]>> => {
  const backlogData = await getBacklogById(backlogItem.backlogId);
  if (!backlogData) return { success: false, data: null };

  const map = backlogData.fields?.reduce((acc, item) => {
    acc.set(item._id, item);
    return acc;
  }, new Map());
  const populatedFields = backlogItem.userFields.map((item) => {
    const curItem = map?.get(item.backlogFieldId);

    return {
      ...item,
      title: curItem?.name ?? "Unknown",
      type: curItem?.type,
    };
  });
  return { success: true, data: populatedFields };
};
