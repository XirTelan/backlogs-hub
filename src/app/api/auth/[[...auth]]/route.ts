import {
  getRedirectOauthLink,
  getUserData as getDiscordUser,
} from "@/auth/providers/discordProvirer";
import { getUserData as getGoogleUser } from "@/auth/providers/googleProvider";
import { generateAccessToken, getTokenData } from "@/auth/utils";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { createUser } from "@/services/user";
import { UserDTO } from "@/types";
import { sendErrorMsg } from "@/utils";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { auth } }: { params: { auth: string | string[] } },
) {
  const type = auth[0];

  if (type === "session") {
    const token = request.cookies.get("access_token")?.value || "";
    const { payload } = await getTokenData(token);
    if (!payload) return NextResponse.json(null);
    return NextResponse.json({
      id: payload.id,
      username: payload.username,
      role: payload.role,
    });
  }
  if (type === "signIn") {
    const url = await getRedirectOauthLink();
    return NextResponse.redirect(url);
  }
  if (type === "callback") {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const provider = auth[1];
    if (!code) return sendErrorMsg("code not specified");
    let userData: Omit<UserDTO, "id"> | undefined = undefined;
    switch (provider) {
      case "google":
        userData = await getGoogleUser(code);
        break;
      case "discord":
        userData = await getDiscordUser(code);
        break;
    }
    if (!userData) return sendErrorMsg("Try again later");
    await dbConnect();
    let user = await User.findOne({ email: userData.email });
    if (!user) {
      user = await createUser(userData);
    }
    const access_token = await generateAccessToken(user);
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("access_token", access_token, { httpOnly: true });
    return response;
  }

  return NextResponse.json(null);
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

  return NextResponse.json(null);
}
