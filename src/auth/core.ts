"use server";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { createUser } from "@/services/user";
import { sendMsg } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import { getTokenData, generateAccessToken, setTokenCookies } from "./utils";
import { getUserData as getDiscordUser } from "@/auth/providers/discordProvirer";
import { getUserData as getGoogleUser } from "@/auth/providers/googleProvider";
import { UserDTO } from "@/zodTypes";
import { ResponseData } from "@/types";
import { SignInSchema, isEmailSchema } from "@/zod";
import bcrypt from "bcrypt";

export const handleSession = async (request: NextRequest) => {
  const token = request.cookies.get("access_token")?.value || "";
  const { payload } = await getTokenData(token);
  if (!payload) return NextResponse.json(null);
  return NextResponse.json({
    id: payload.id,
    username: payload.username,
    role: payload.role,
  });
};

export const handleCallback = async (
  request: NextRequest,
  provider: string,
) => {
  if (!provider) return sendMsg.error("Provider is required");
  const searchParams = request.nextUrl.searchParams;
  const errors = searchParams.get("error");
  if (errors && errors === "access_denied") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  const code = searchParams.get("code");
  if (!code) return sendMsg.error("code not specified");

  let userData: Pick<UserDTO, "username" | "email" | "provider"> | undefined =
    undefined;
  switch (provider) {
    case "google":
      userData = await getGoogleUser(code);
      break;
    case "discord":
      userData = await getDiscordUser(code);
      break;
  }
  if (!userData) return sendMsg.error("Try again later");
  await dbConnect();
  let user: Omit<UserDTO, "password"> | null = await User.findOne({
    email: userData.email,
  }).lean();

  if (!user) {
    const res = await createUser(userData);
    if (!res.isSuccess)
      return NextResponse.json({ message: res.message }, { status: 500 });
    user = res.data;
  }
  const access_token = await generateAccessToken(user);
  return await setTokenCookies(access_token, request.url);
};

export const signInWithLogin = async (
  data: unknown,
): Promise<ResponseData<string>> => {
  const error: ResponseData<string> = {
    isSuccess: false,
    message: "Username or password is incorrect",
  };
  const parsedCredentials = SignInSchema.safeParse(data);
  if (!parsedCredentials.success) return error;
  const { login, password } = parsedCredentials.data;
  const isEmail = isEmailSchema.safeParse(login);
  const options = isEmail.success
    ? { email: isEmail.data }
    : {
        username: login,
      };
  await dbConnect();
  const user = await User.findOne(options);
  if (!user || !user.password) return error;
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return error;
  const access_token = await generateAccessToken(user);
  return { isSuccess: true, data: access_token };
};

export const updatePassword = async () => {};
