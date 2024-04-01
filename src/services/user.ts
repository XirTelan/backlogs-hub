"use server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { UserCreationDTO, UserDTO } from "@/types";
import { NextResponse } from "next/server";

type CreateUser =
  | {
      status: "error";
      message: string;
    }
  | {
      status: "success";
      data: UserDTO;
    };

export async function createUser(data: UserCreationDTO): Promise<CreateUser> {
  try {
    await dbConnect();
    const user = await User.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });
    if (user) {
      return {
        status: "error",
        message: "User already exist",
      };
    }
    data.folders = ["Uncategorized"];
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
      status: "error",
      message: "Unexpected error",
    };
  }
}

export async function updateUser(data: UserDTO) {
  await dbConnect();
  const user = await User.findOne({ email: data.email });
  if (user)
    return NextResponse.json(
      { message: "User already exist" },
      { status: 409 },
    );
}

export async function deleteUser(id: string) {
  try {
    await dbConnect();
    await User.deleteOne({ _id: id });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
  return NextResponse.json(null, { status: 200 });
}

export async function getUserVisibility(username: string) {
  try {
    await dbConnect();
    const visibility = await User.findOne({ username: username }).select([
      "profileVisibility",
      "-_id",
    ]);
    return visibility.profileVisibility;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
