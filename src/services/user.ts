"use server";
import dbConnect from "@/lib/dbConnect";
import UserDB from "@/models/User";
import { NextResponse } from "next/server";

export async function createUser(data: any) {
  const emailAddress = data.email_addresses[0].email_address;
  try {
    await dbConnect();
    const user = await UserDB.findOne({ email: emailAddress });
    if (user)
      return NextResponse.json(
        { message: "User already exist" },
        { status: 409 },
      );
    const newUser = new UserDB({
      userName: data.username,
      email: emailAddress,
    });
    await newUser.save();
  } catch (error) {
    console.error("errors", error);
  }
  return NextResponse.json({ message: "User created" }, { status: 201 });
}

export async function updateUser(data: User) {
  await dbConnect();
  const user = await UserDB.findOne({ email: data.emailAddresses });
  if (user)
    return NextResponse.json(
      { message: "User already exist" },
      { status: 409 },
    );
}

export async function deleteUser(id: string) {
  try {
    await dbConnect();
    await UserDB.deleteOne({ _id: id });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
  return NextResponse.json(null, { status: 200 });
}
