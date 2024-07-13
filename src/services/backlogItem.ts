import dbConnect from "@/lib/dbConnect";
import Backlog from "@/models/Backlog";
import BacklogItem from "@/models/BacklogItem";
import { ResponseData } from "@/types";
import { BacklogItemCreationDTO, BacklogItemDTO } from "@/zodTypes";
import { NextResponse } from "next/server";

export const getBacklogItemById = async (
  itemId: string,
): Promise<ResponseData<BacklogItemDTO>> => {
  try {
    await dbConnect();
    const backlogItem: BacklogItemDTO | null =
      await BacklogItem.findById(itemId).lean();
    if (!backlogItem) return { isSuccess: false, message: "doesnt exist" };
    backlogItem._id = backlogItem._id.toString();
    return { isSuccess: true, data: backlogItem };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getBacklogItemsByBacklogId = async (
  backlogId: string | undefined,
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
    ).lean();
    return backlogData.map((backlog) => ({
      ...backlog,
      _id: backlog._id.toString(),
    }));
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getBacklogItemsByQuery = async ({
  backlogId,
  categories,
  search,
}: {
  backlogId: string;
  categories: string[] | null | undefined;
  search: string | null;
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
    const result = await stage.exec();

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
    const backlogItem = await BacklogItem.create(data);
    await Backlog.findByIdAndUpdate(backlogItem.backlogId, {
      $inc: { totalCount: 1 },
    });
    return backlogItem;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const putBacklogItem = async (data: BacklogItemDTO) => {
  try {
    await dbConnect();
    await BacklogItem.updateOne({ _id: data._id }, data);
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
  search: string | null | undefined,
  backlogId: string,
): Promise<ResponseData<BacklogItemDTO[]>> => {
  let backlogData;
  try {
    if (search || (categories && categories.length > 0)) {
      backlogData = await getBacklogItemsByQuery({
        backlogId: backlogId,
        categories: categories,
        search: search ? search : null,
      });
    } else {
      backlogData = await getBacklogItemsByBacklogId(backlogId);
    }
    if (backlogData) {
      return { isSuccess: true, data: backlogData };
    }
    return {
      isSuccess: false,
      data: null,
      errors: {
        message: "The requested objects were not found.",
        details: "Please check your parameters and ensure they are correct",
      },
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};
