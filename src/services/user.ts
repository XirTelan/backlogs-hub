"use server";
import { getCurrentUserInfo } from "@/auth/utils";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { ResponseData, UserCreationDTO } from "@/types";
import { ConfigType, UserDTO } from "@/zodTypes";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const userDataTypes = {
  folders: ["folders", "-_id"],
  visibility: ["config.profileVisibility", "-_id"],
  all: ["-password", "-_id"],
};
type UserDataTypes = keyof typeof userDataTypes;

export async function getUserData(
  username: string,
  select: UserDataTypes,
): Promise<ResponseData<Partial<UserDTO>>> {
  try {
    await dbConnect();
    const user = await User.findOne({ username: username })
      .select(userDataTypes[select])
      .lean();
    if (!user) return { isSuccess: false };
    return { isSuccess: true, data: user };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export async function getCurrentUserData(): Promise<
  ResponseData<Partial<UserDTO>>
> {
  try {
    const user = await getCurrentUserInfo();
    if (!user) return { isSuccess: false };
    return await getUserData(user?.username, "all");
  } catch (error) {
    throw new Error(`Error: ${error}`);
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
export async function createUser(
  data: UserCreationDTO,
): Promise<ResponseData<Omit<UserDTO, "password">>> {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUser } = await User.create(data);
    return {
      isSuccess: true,
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
    if (!user) return { isSuccess: false, message: "User doesnt exist" };
    user.folders = data;
    await user.save();
    return { isSuccess: true };
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
    const userData = await User.findById(user.id).lean();
    if (!userData) return { isSuccess: false, message: "Something goes wrong" };
    return { isSuccess: true, data: userData.config };
  } catch (error) {
    return { isSuccess: false, message: JSON.stringify(error) };
  }
}

export async function updateUserInfo(
  option: string,
  value: unknown,
  type: "general" | "config" = "config",
) {
  console.log("trugg");
  const user = await getCurrentUserInfo();
  if (!user) return { isSuccess: false, message: "Something goes wrong" };
  try {
    await dbConnect();
    const userData = await User.findById(user.id);
    if (!userData) return { isSuccess: false, message: "User doesnt exist" };

    let update;
    switch (type) {
      case "general":
        update = {
          [option]: value,
        };
        break;
      case "config":
        update = {
          config: { ...userData.config, [option]: value },
        };
        break;
    }
    console.log("update", update);
    await userData.updateOne(update);
    revalidatePath("/");
    return { isSuccess: true };
  } catch (error) {
    return { error: error, isSuccess: false };
  }
}
