import { handleCallback, handleSession } from "@/auth/core";
import { getRedirectOauthLink } from "@/auth/providers/discordProvirer";
import { generateAccessToken, setTokenCookies } from "@/auth/utils";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { createUser } from "@/services/user";
import { sendErrorMsg } from "@/utils";
import { RegistrationSchema, SignInSchema } from "@/zod";
import bcrypt from "bcrypt";

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params: { auth } }: { params: { auth: string | string[] } },
) {
  const type = auth[0];
  switch (type) {
    case "session":
      return handleSession(request);
    case "signIn": {
      const url = await getRedirectOauthLink();
      return NextResponse.redirect(url);
    }
    case "callback":
      return handleCallback(request, auth[1]);
    default:
      return NextResponse.json(null);
  }
}

export async function POST(
  request: NextRequest,
  { params: { auth } }: { params: { auth: string | string[] } },
) {
  const type = auth[0];
  if (type === "signOut") {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("access_token");
    revalidatePath("/");
    return response;
  }
  if (type === "register") {
    const data = await request.json();
    const parsedCredentials = RegistrationSchema.safeParse(data);
    if (!parsedCredentials.success)
      return sendErrorMsg("Unexpected error. Try again later");

    const passwordHashed = await bcrypt.hash(
      parsedCredentials.data.password,
      12,
    );
    const result = await createUser({
      username: parsedCredentials.data.username,
      email: parsedCredentials.data.email,
      password: passwordHashed,
      profileVisibility: "public",
    });
    if (result.status === "error") return sendErrorMsg(result.message);
    return NextResponse.json(
      { message: "Created", data: result.data },
      { status: 201 },
    );
  }
  if (type === "signIn") {
    const data = await request.json();
    const parsedCredentials = SignInSchema.safeParse(data);
    if (!parsedCredentials.success)
      return sendErrorMsg("Username or password is incorrect");
    console.log("parsed", parsedCredentials);
    await dbConnect();
    const user = await User.findOne({ username: data.username });
    console.log(user);
    if (!user.password)
      return sendErrorMsg("Username or password is incorrect 2");
    const passwordMatch = await bcrypt.compare(
      parsedCredentials.data.password,
      user.password,
    );
    if (!passwordMatch)
      return sendErrorMsg("Username or password is incorrect");
    const access_token = await generateAccessToken(user);
    console.log("data sign in", data, passwordMatch);
    return setTokenCookies(access_token, request.url);
  }

  return NextResponse.json(null);
}
