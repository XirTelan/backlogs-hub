import dbConnect from "@/lib/dbConnect";
import Template from "@/models/Template";
import { TemplateDTO } from "@/types";

export const getTemplateById = async (id: string) => {
  try {
    await dbConnect();
    const template = await Template.findById(id);
    return template;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getTemplates = async () => {
  try {
    await dbConnect();
    const templates = await Template.find().lean();
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
