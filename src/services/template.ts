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

export const getTemplatesByUsername = async (username: string) => {
  try {
    await dbConnect();
    const templates = await Template.find({ author: username }).lean();
    return templates;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const createTemplate = async (data: TemplateDTO) => {
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
      return { status: "error", message: "Not Authorized" };
    const res = await template?.deleteOne();
    return { status: "ok", data: res?.deletedCount };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
