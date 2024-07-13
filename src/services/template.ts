import dbConnect from "@/lib/dbConnect";
import Template from "@/models/Template";
import { ResponseData } from "@/types";
import { TemplateDTO } from "@/zodTypes";

export const getTemplateById = async (id: string) => {
  try {
    await dbConnect();
    const template = await Template.findById(id);
    return template;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getTemplates = async (currentUserName: string, except = false) => {
  try {
    await dbConnect();
    const options = !except
      ? {
          $or: [{ visibility: "public" }, { author: currentUserName }],
        }
      : {
          $and: [
            { visibility: "public" },
            { author: { $ne: currentUserName } },
          ],
        };
    const templates = await Template.find(options).lean();
    return templates;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getTemplatesByUser = async (
  user: string,
  type: "username" | "userid" = "username",
) => {
  try {
    await dbConnect();
    const options = type === "userid" ? { userId: user } : { author: user };
    const templates = await Template.find(options).lean();
    return templates;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const createTemplate = async (data: Omit<TemplateDTO, "_id">) => {
  try {
    await dbConnect();
    const template = new Template(data);
    await template.save();
    return template;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const deleteTemplate = async (
  id: string,
  userName: string | undefined,
): Promise<ResponseData<number | undefined>> => {
  try {
    await dbConnect();
    const template = await Template.findById(id);
    if (!userName || template?.author !== userName)
      return { isSuccess: false, message: "Not Authorized" };
    const res = await template?.deleteOne();
    return { isSuccess: true, data: res?.deletedCount };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
