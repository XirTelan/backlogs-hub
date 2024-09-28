"use server";
import { getCurrentUserInfo } from "@/auth/utils";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { ResponseData } from "@/types";
import { ConfigType, StatsType, UserDTO } from "@/zodTypes";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Backlog from "@/models/Backlog";
import BacklogItem from "@/models/BacklogItem";
import Account from "@/models/Account";
import Template from "@/models/Template";

const userDataTypes = {
  folders: { folders: 1, config: 1 },
  config: { config: 1 },
  all: { password: 0 },
};
const DEFAULT_CONFIG: ConfigType = {
  profileVisibility: "public",
  hideFolderNames: false,
  showEmptyFolders: true,
  canChangeUserName: false,
  pagination: "bottom",
  hideAsideNavBacklogs: false,
  categoryDesignation: "color",
  categoryBlockView: "dropDown",
};
type UserDataTypes = keyof typeof userDataTypes;

export async function getUserData(
  username: string,
  select: UserDataTypes,
): Promise<ResponseData<Partial<UserDTO>>> {
  try {
    await dbConnect();
    const user = await User.findOne(
      { username: username },
      userDataTypes[select],
    )
      .collation({ locale: "en", strength: 2 })
      .populate({ path: "accounts", select: "provider email " })
      .lean();
    if (!user) return { success: false };
    user._id = user._id.toString();
    if (select !== "all") user.accounts = [];
    return { success: true, data: user };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export async function getCurrentUserData(
  type: UserDataTypes = "all",
): Promise<ResponseData<Partial<UserDTO>>> {
  try {
    const user = await getCurrentUserInfo();
    if (!user) return { success: false };
    return await getUserData(user.username, type);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
export async function isUserNameExist(username: string) {
  try {
    await dbConnect();
    const user = await User.exists({ username: username })
      .collation({ locale: "en", strength: 2 })
      .lean();
    return !!user?._id;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
//PUT/PATCH
export async function createUser(
  data: Partial<UserDTO>,
): Promise<ResponseData<Omit<UserDTO, "password">>> {
  try {
    await dbConnect();
    const user = await User.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });
    if (user) {
      return {
        success: false,
        message: "User already exist",
      };
    }
    data.folders = ["Default"];
    data.displayName = data.username;
    data.config =
      data.provider === "oauth"
        ? {
            ...DEFAULT_CONFIG,
            canChangeUserName: true,
          }
        : DEFAULT_CONFIG;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUser } = (await User.create(data)).toObject();
    return {
      success: true,
      data: newUser,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Unexpected error",
    };
  }
}
export const updateUserFolders = async (username: string, data: string[]) => {
  try {
    await dbConnect();
    const user = await User.findOne({ username: username });
    if (!user) return { success: false, message: "User doesnt exist" };
    user.folders = data;
    await user.save();
    return { success: true };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

//DELETE
export async function deleteUser(id: string) {
  try {
    await dbConnect();
    const backlogs = await Backlog.find({ userId: id });
    const itemsToDelete: Promise<unknown>[] = [];
    backlogs.forEach(async (backlog) => {
      itemsToDelete.push(BacklogItem.deleteMany({ backlogId: backlog._id }));
      itemsToDelete.push(backlog.deleteOne());
    });
    await Promise.all([
      ...itemsToDelete,
      Template.deleteMany({ userId: id }),
      Account.deleteMany({ userId: id }),
      User.deleteOne({ _id: id }),
    ]);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
  return NextResponse.json(null, { status: 200 });
}
//utils
export async function getConfigOptions(): Promise<ResponseData<ConfigType>> {
  const user = await getCurrentUserInfo();
  if (!user) return { success: false, message: "Something goes wrong" };
  try {
    await dbConnect();
    const userData = await User.findById(user.id).lean();
    if (!userData) return { success: false, message: "Something goes wrong" };
    return { success: true, data: userData.config };
  } catch (error) {
    return { success: false, message: JSON.stringify(error) };
  }
}

export async function updateUserInfo(
  option: string,
  value: unknown,
  type: "general" | "config" = "config",
) {
  try {
    const user = await getCurrentUserInfo();
    if (!user) return { success: false, message: "Something goes wrong" };
    await dbConnect();
    const userData = await User.findById(user.id);
    if (!userData) return { success: false, message: "User doesnt exist" };

    let update;
    switch (type) {
      case "general":
        if (option === "password") {
          value = await bcrypt.hash(String(value), 12);
        }
        update = {
          [option]: value,
        };
        break;
      case "config":
        update = {
          config: { ...userData.toObject().config, [option]: value },
        };
        break;
    }
    await userData.updateOne(update);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: error, success: false };
  }
}

export async function changeUserName(username: string) {
  if (typeof username !== "string") return { success: false };
  const regEx = new RegExp(/^[a-zA-Z0-9_=]+$/);
  const valid = regEx.test(username);
  if (!valid) return { success: false };
  try {
    const user = await getCurrentUserInfo();
    if (!user) return { success: false, message: "Something goes wrong" };
    await dbConnect();
    const userData = await User.findById(user.id).lean();
    if (!userData) return { success: false, message: "User doesnt exist" };

    const updatedOne = await User.findByIdAndUpdate(
      userData._id,
      {
        username: username,
        config: { ...userData.config, canChangeUserName: false },
      },
      { returnDocument: "after" },
    ).lean();
    await Backlog.updateMany(
      { userId: userData._id },
      { userName: updatedOne?.username },
    );

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error ", success: false };
  }
}

export async function updateStat(
  id: string,
  option: keyof StatsType,
  type: "increment" | "decrement" = "increment",
  defVal = 1,
) {
  try {
    await dbConnect();
    const user = await User.findById(id);
    const stats = user?.stats;
    if (!user || !stats) return;
    if (!Object.prototype.hasOwnProperty.call(stats, option)) {
      return;
    }
    const oldVal = stats[option] || 0;
    const newVal = type === "increment" ? oldVal + defVal : oldVal - defVal;
    await user.updateOne({ stats: { ...stats, [option]: newVal } });
  } catch (error) {
    console.error(error);
    throw new Error(`Update error`);
  }
}
