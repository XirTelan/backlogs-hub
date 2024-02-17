import { getToken } from "@/auth/providers/googleProviders";
import { getTokenData } from "@/auth/utils";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { sendErrorMsg } from "@/utils";
import { SignJWT, decodeJwt } from "jose";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { auth } }: { params: { auth: string | string[] } },
) {
  const type = auth[0];
  const provider = auth[1];
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

  if (type === "callback" && provider === "google") {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    if (!code) return sendErrorMsg("Message");
    const token = await getToken(code);
    const userData = decodeJwt(token.id_token);
    await dbConnect();
    let user = await User.findOne({ email: userData.email });
    if (!user) {
      const newUser = new User({
        id: user._id,
        username: `user_G${userData.sub}`,
        email: userData.email,
      });
      user = await newUser.save();
    }

    const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);
    const tokenData = { id: user._id, username: user.username, role: "user" };
    const access_token = await new SignJWT(tokenData)
      .setProtectedHeader({
        alg: "HS256",
      })
      .setExpirationTime("1h")
      .sign(secret);
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
