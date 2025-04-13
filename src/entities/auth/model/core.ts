"use server";

import dbConnect from "@/shared/lib/dbConnect";
import { createUser } from "@/shared/api/user";
import { sendMsg } from "@/shared/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import {
  getTokenData,
  generateAccessToken,
  setTokenCookies,
  getCurrentUserInfo,
} from "../utils/utils";
import { getUserData as getDiscordUser } from "@/entities/auth/providers/discordProvirer";
import { getUserData as getGoogleUser } from "@/entities/auth/providers/googleProvider";

import { SignInSchema, isEmailSchema } from "@/shared/zodSchemas/zod";
import bcrypt from "bcryptjs";
import Account from "@/models/Account";
import User from "@/models/User";
import { OAuthProps, ResponseData } from "@/shared/types";

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
  if (!res.success || !res.data._id) return undefined;
  await createAndLinkAccount(oauthData, res.data._id.toString(), url);
  return res.data;
};

const createAndLinkAccount = async (
  oauthData: OAuthProps,
  id: string,
  url: string
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
  provider: string
) => {
  if (!provider) return sendMsg.error("Provider is required");

  const searchParams = request.nextUrl.searchParams;
  const errors = searchParams.get("error");

  if (errors && errors === "access_denied") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const code = searchParams.get("code");
  if (!code) {
    console.error("Invalid code format ", code);
    return sendMsg.error("Invalid code");
  }

  let oauthData: OAuthProps | undefined = undefined;
  try {
    const res = await getOAuthData(provider, code);
    if (!res.success) return sendMsg.error("Authorize error");
    oauthData = res.data;
  } catch (e) {
    console.error(e);
    return sendMsg.error("Authorize error, check logs for more information");
  }

  if (!oauthData?.email || !oauthData?.username) {
    console.error(oauthData);
    return sendMsg.error("Try again later");
  }

  await dbConnect();

  //find account
  const account = await Account.findOne({
    email: oauthData.email,
    provider: provider,
  }).lean();
  const currentUser = await getCurrentUserInfo();
  //if user already signIn ->it's link req
  if (currentUser) {
    //if acc exist,
    if (account) {
      return NextResponse.json(
        { message: "Already linked to another user" },
        { status: 400 }
      );
    }
    return await createAndLinkAccount(oauthData, currentUser.id, request.url);
  }
  let user;
  if (!account) {
    //we need create acc.
    const userWithSameEmail = await User.findOne({
      email: oauthData.email,
    })
      .populate({ path: "accounts", select: "provider email " })
      .lean();
    if (userWithSameEmail) {
      await createAndLinkAccount(
        oauthData,
        userWithSameEmail._id.toString(),
        request.url
      );
      user = userWithSameEmail;
      //we have user with same email as new Oauth Account
    } else {
      //else it's new acc and new user
      user = await createAccountAndUser(oauthData, request.url);
    }
  } else {
    user = await User.findById(account.userId).lean();
    //its signIn for exist user
  }
  if (!user || !user._id || !user.username) return sendMsg.error("Unkonw");

  const access_token = await generateAccessToken(
    user._id.toString(),
    user.username
  );
  return await setTokenCookies(access_token, request.url);
};

export const signInWithLogin = async (
  data: unknown
): Promise<ResponseData<string>> => {
  const error: ResponseData<string> = {
    success: false,
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
  const access_token = await generateAccessToken(
    user._id.toString(),
    user.username
  );
  return { success: true, data: access_token };
};

const getOAuthData = async (provider: string, code: string) => {
  switch (provider) {
    case "google": {
      return await getGoogleUser(code);
    }
    case "discord":
      return await getDiscordUser(code);
    default:
      throw new Error("Unsupported provider");
  }
};

export const updatePassword = async () => {};
