import { handleCallback, handleSession, signInWithLogin } from "@/auth/core";
import { getRedirectOauthLink } from "@/auth/providers/discordProvirer";
import { setTokenCookies } from "@/auth/utils";

import { createUser } from "@/services/user";
import { sendMsg } from "@/utils";
import { RegistrationSchema } from "@/zod";
import bcrypt from "bcrypt";

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

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
      return sendMsg.error("Unexpected error. Try again later");

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
    if (result.status === "error") return sendMsg.error(result.message);
    return NextResponse.json(
      { message: "Created", data: result.data },
      { status: 201 },
    );
  }
  if (type === "signIn") {
    const data = await request.json();
    const response = await signInWithLogin(data);
    if (response.status === "error") return sendMsg.error(response.message);
    return setTokenCookies(response.data, request.url);
  }

  return NextResponse.json(null);
}
