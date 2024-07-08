"use server";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { createUser } from "@/services/user";
import { sendMsg } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import {
  getTokenData,
  generateAccessToken,
  setTokenCookies,
  getCurrentUserInfo,
} from "./utils";
import { getUserData as getDiscordUser } from "@/auth/providers/discordProvirer";
import { getUserData as getGoogleUser } from "@/auth/providers/googleProvider";
import { OAuthProps } from "@/zodTypes";
import { ResponseData } from "@/types";
import { SignInSchema, isEmailSchema } from "@/zod";
import bcrypt from "bcrypt";
import Account from "@/models/Account";

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

const createAccountAndUser = async (oauthData: OAuthProps, url: string) => {
  const res = await createUser({ ...oauthData, provider: "oauth" });
  if (!res.isSuccess) return undefined;
  await createAndLinkAccount(oauthData, res.data._id, url);
  return res.data;
};

const createAndLinkAccount = async (
  oauthData: OAuthProps,
  id: string,
  url: string,
) => {
  const user = await User.findById(id);
  if (!user) {
    return NextResponse.json({ message: " Error" }, { status: 500 });
  }

  const newAccount = new Account({ ...oauthData, userId: user._id });
  const savedAccount = await newAccount.save();
  user.provider = "oauth";
  user.accounts = [...user.accounts, savedAccount._id.toString()] as string[];
  await user.save();
  return NextResponse.redirect(new URL("/settings/account", url));
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
  console.log("check 1", code);
  let oauthData: OAuthProps | undefined = undefined;
  switch (provider) {
    case "google":
      oauthData = await getGoogleUser(code);
      break;
    case "discord":
      oauthData = await getDiscordUser(code);
      break;
  }

  if (!oauthData || !oauthData.email || !oauthData.username)
    return sendMsg.error("Try again later");
  await dbConnect();

  //find account
  const account = await Account.findOne({
    email: oauthData.email,
    provider: provider,
  }).lean();
  const currentUser = await getCurrentUserInfo();
  console.log("check 3", account);
  //if user already signIn ->it's link req
  if (currentUser) {
    //if acc exist,
    console.log("check 3.1");
    if (account) {
      return NextResponse.json(
        { message: "Already linked to another user" },
        { status: 400 },
      );
    }
    return await createAndLinkAccount(oauthData, currentUser.id, request.url);
  }
  let user;
  console.log("check 4");
  if (!account) {
    console.log("check 4.1");
    //we need create acc.
    const userWithSameEmail = await User.findOne({
      email: oauthData.email,
    })
      .populate({ path: "accounts", select: "provider email " })
      .lean();
    if (userWithSameEmail) {
      console.log("check 4.1.1", userWithSameEmail);
      await createAndLinkAccount(oauthData, userWithSameEmail._id, request.url);
      user = userWithSameEmail;
      //we have user with same email as new Oauth Account
    } else {
      //else it's new acc and new user
      console.log("check 4.1.2");
      user = await createAccountAndUser(oauthData, request.url);
    }
  } else {
    console.log("check 4.2", account.userId);
    user = await User.findById(account.userId).lean();
    //its signIn for exist user
  }
  console.log("res user", user);
  if (!user) return sendMsg.error("Unkonw");

  const access_token = await generateAccessToken({
    _id: user._id,
    username: user.username,
  });
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
