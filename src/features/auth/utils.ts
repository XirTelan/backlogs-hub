"use server";

import { JWTPayload, JWTVerifyResult, SignJWT, jwtVerify } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const EXPIRATION_TIME = "7d";

export const getTokenData = async (token: string) => {
  try {
    const tokenData: JWTVerifyResult<JWTPayload & TokenData> = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.AUTH_SECRET!)
    );
    return tokenData;
  } catch (error) {
    return { error: error, payload: null };
  }
};

export const getCurrentUserInfo = async (
  request: NextRequest | undefined = undefined
): Promise<TokenData | null> => {
  let token;
  if (request) token = request.cookies.get("access_token")?.value;
  else token = (await cookies()).get("access_token")?.value;

  if (!token) return null;

  const { payload } = await getTokenData(token);
  if (!payload) return null;
  return payload;
};

export const generateAccessToken = async (_id: string, username: string) => {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);
  const tokenData = { id: _id, username };
  const access_token = await new SignJWT(tokenData)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime(EXPIRATION_TIME)
    .sign(secret);
  return access_token;
};

export type TokenData = {
  id: string;
  username: string;
};

export const setTokenCookies = async (token: string, url: string) => {
  const response = NextResponse.redirect(new URL("/", url));
  response.cookies.set("access_token", token, {
    httpOnly: true,
    maxAge: 604800,
    sameSite: "lax",
  });
  return response;
};

export const clearCookiesToken = async (request: NextRequest) => {
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.delete("access_token");
  revalidatePath("/");
  return response;
};
