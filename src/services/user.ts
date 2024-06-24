"use server";
import { getCurrentUserInfo } from "@/auth/utils";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { ResponseData, UserCreationDTO } from "@/types";
import { ConfigType, UserDTO } from "@/zodTypes";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type CreateUser =
  | {
      isSuccess: false;
      message: string;
    }
  | {
      status: "success";
      data: UserDTO;
    };

export async function getUserFolders(username: string) {
  try {
    await dbConnect();
    const user = (await User.findOne({ username: username })
      .select(["folders", "-_id"])
      .lean()) as { folders: string[] };
    return user.folders || [];
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
export async function getUserVisibility(username: string) {
  try {
    await dbConnect();
    const visibility = (await User.findOne({ username: username })
      .select(["config.profileVisibility", "-_id"])
      .lean()) as { config: { profileVisibility: string } };
    return visibility.config.profileVisibility;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function isUserNameExist(username: string) {
  try {
    await dbConnect();
    const user = await User.exists({ username: username }).lean();
    return !!user?._id;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
//PUT/PATCH
export async function createUser(data: UserCreationDTO): Promise<CreateUser> {
  try {
    await dbConnect();
    const user = await User.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });
    if (user) {
      return {
        isSuccess: false,
        message: "User already exist",
      };
    }
    data.folders = ["Default"];
    const newUser = new User(data);
    await newUser.save();
    newUser.password = undefined;
    return {
      status: "success",
      data: newUser,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      message: "Unexpected error",
    };
  }
}
export const updateUserFolders = async (username: string, data: string[]) => {
  try {
    await dbConnect();
    const user = await User.findOne({ username: username });
    user.folders = data;
    await user.save();
  } catch (error) {
    throw new Error(`${error}`);
  }
};

//DELETE
export async function deleteUser(id: string) {
  try {
    await dbConnect();
    await User.deleteOne({ _id: id });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
  return NextResponse.json(null, { status: 200 });
}
//utils
export async function getConfigOptions(): Promise<ResponseData<ConfigType>> {
  const user = await getCurrentUserInfo();
  if (!user) return { isSuccess: false, message: "Something goes wrong" };
  try {
    await dbConnect();
    const userData: UserDTO | null = await User.findById(user.id).lean();
    if (!userData) return { isSuccess: false, message: "Something goes wrong" };
    return { isSuccess: true, data: userData.config };
  } catch (error) {
    return { isSuccess: false, message: JSON.stringify(error) };
  }
}

export async function updateConfigOption(option: string, value: unknown) {
  const user = await getCurrentUserInfo();
  if (!user) return { isSuccess: false, message: "Something goes wrong" };
  try {
    await dbConnect();
    const userData = await User.findById(user.id);
    await User.findByIdAndUpdate(user.id, {
      config: { ...userData.config, [option]: value },
    });
    revalidatePath("/");
    return { isSuccess: true };
  } catch (error) {
    return { error: error, isSuccess: false };
  }
}
