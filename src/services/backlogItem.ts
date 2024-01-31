import dbConnect from "@/lib/dbConnect";
import BacklogItem from "@/models/BacklogItem";

export const getBacklogItemsByBacklogId = async ({
  backlogId,
  categories,
}: BacklogItemDTO) => {
  try {
    await dbConnect();
    let backlogData;
    if (categories && categories.length > 0) {
      backlogData = await BacklogItem.find({
        backlogId: backlogId,
        category: { $in: categories },
      });
    } else {
      backlogData = await BacklogItem.find({ backlogId: backlogId });
    }
    return backlogData;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const addBacklogItem = async (data) => {
  try {
    await dbConnect();
    const backlogItem = new BacklogItem(data);
    await backlogItem.save();
    return backlogItem;
  } catch (error) {
    console.log("here?", error);
    throw new Error(`Error: ${error}`);
  }
};

interface BacklogItemDTO {
  backlogId: string;
  categories?: string[] | null;
}
