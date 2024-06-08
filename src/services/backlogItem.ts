import dbConnect from "@/lib/dbConnect";
import BacklogItem from "@/models/BacklogItem";
import { BacklogItemCreationDTO, BacklogItemDTO, ResponseData } from "@/types";
import { NextResponse } from "next/server";


export const getBacklogItemById = async (
  itemId: string,
): Promise<ResponseData<BacklogItemDTO>> => {
  try {
    await dbConnect();
    const backlogData: BacklogItemDTO | null =
      await BacklogItem.findById(itemId).lean();
    if (!backlogData)
      return { status: "error", message: "doesnt exist" };
    backlogData._id = backlogData._id.toString();
    return { status: "ok", data: backlogData };
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
    const backlogData: BacklogItemDTO[] = await BacklogItem.find({
      backlogId: backlogId,
    }).lean();
    return backlogData;
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
  await dbConnect();
  const stage = BacklogItem.aggregate();
  stage.match({ backlogId: backlogId });
  if (categories && categories.length > 0)
    stage.match({ category: { $in: categories } });
  if (search) stage.match({ title: new RegExp(search) });
  const result = await stage.exec();
  return result;
};

export const addBacklogItem = async (data: BacklogItemCreationDTO) => {
  try {
    await dbConnect();
    const backlogItem = new BacklogItem(data);
    await backlogItem.save();
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
    const deleteResult = await BacklogItem.deleteOne({ _id: id });
    return deleteResult;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
