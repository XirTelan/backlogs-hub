"use server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { UserDTO } from "@/types";
import { NextResponse } from "next/server";

export async function createUser(data: Omit<UserDTO, "id">) {
  try {
    await dbConnect();
    const user = await User.findOne({ email: data.email });
    if (user)
      return NextResponse.json(
        { message: "User already exist" },
        { status: 409 },
      );
    const newUser = new User(data);
    return await newUser.save();
  } catch (error) {
    console.error("errors", error);
  }
  return NextResponse.json({ message: "User created" }, { status: 201 });
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
