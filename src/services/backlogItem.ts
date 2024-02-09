import dbConnect from "@/lib/dbConnect";
import BacklogItem from "@/models/BacklogItem";
import { BacklogItemDTO } from "@/types";
import { NextResponse } from "next/server";

export const getBacklogItemById = async ({
  itemId,
}: {
  itemId: string;
}): Promise<BacklogItemDTO> => {
  try {
    await dbConnect();
    const backlogData = await BacklogItem.findById(itemId);
    return backlogData;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getBacklogItemsByBacklogId = async ({
  backlogId,
}: {
  backlogId: string;
}) => {
  try {
    await dbConnect();
    const backlogData = await BacklogItem.find({ backlogId: backlogId });
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

export const addBacklogItem = async (data) => {
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
