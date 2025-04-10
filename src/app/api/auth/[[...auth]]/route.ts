import { handleCallback, handleSession, signInWithLogin } from "@/auth/core";
import {
  clearCookiesToken,
  generateAccessToken,
  getCurrentUserInfo,
  setTokenCookies,
} from "@/auth/utils";
import User from "@/models/User";

import { createUser } from "@/services/user";
import { sendMsg } from "@/utils";
import { RegistrationSchema } from "@/zod";
import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ auth: string | string[] }>;

export async function GET(request: NextRequest, props: { params: Params }) {
  const { auth } = await props.params;

  const type = auth[0];
  switch (type) {
    case "session":
      return handleSession(request);
    case "callback":
      return handleCallback(request, auth[1]);
    default:
      return NextResponse.json(null);
  }
}

export async function POST(request: NextRequest, props: { params: Params }) {
  const { auth } = await props.params;

  const type = auth[0];
  switch (type) {
    case "signIn": {
      return handleSignIn(request);
    }
    case "register": {
      return handleRegister(request);
    }
    case "signOut": {
      return clearCookiesToken(request);
    }
    case "refresh": {
      const tokenData = await getCurrentUserInfo();
      const user = await User.findById(tokenData?.id).select("username").lean();
      if (!user) return NextResponse.json(null);
      const access_token = await generateAccessToken(user);
      return await setTokenCookies(access_token, request.url);
    }
  }
  return NextResponse.json(null);
}

const handleRegister = async (request: NextRequest) => {
  const data = await request.json();
  const parsedCredentials = RegistrationSchema.safeParse(data);
  if (!parsedCredentials.success)
    return sendMsg.error("Unexpected error. Try again later");
  const { data: userData } = parsedCredentials;
  if (userData.password !== userData.passwordConfirm)
    return sendMsg.error("The passwords did not match");
  const passwordHashed = await bcrypt.hash(parsedCredentials.data.password, 12);
  const result = await createUser({
    username: userData.username,
    email: userData.email,
    password: passwordHashed,
    provider: "credentials",
  });
  if (!result.success) return sendMsg.error(result.message);
  return NextResponse.json(
    { message: "Created", data: result.data },
    { status: 201 },
  );
};

const handleSignIn = async (request: NextRequest) => {
  const data = await request.json();
  const response = await signInWithLogin(data);
  if (!response.success) return sendMsg.error(response.message);
  return setTokenCookies(response.data, request.url);
};
