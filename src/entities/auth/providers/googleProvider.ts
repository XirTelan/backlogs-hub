"use server";

import { ResponseData, OAuthProps, UserDB } from "@/shared/types";
import { JWTPayload, decodeJwt } from "jose";

const TOKEN_URL = "https://oauth2.googleapis.com/token";

export const getGoogleToken = async (code: string) => {
  if (
    !process.env.GOOGLE_ID ||
    !process.env.GOOGLE_SECRET ||
    !process.env.DOMAIN_URL
  ) {
    console.error("OAuth env vars not provided");
    throw new Error("OAuth env vars not provided");
  }
  const params = {
    client_id: process.env.GOOGLE_ID,
    client_secret: process.env.GOOGLE_SECRET,
    code: code,
    redirect_uri: `${process.env.DOMAIN_URL}/api/auth/callback/google`,
    grant_type: "authorization_code",
  };

  const payload = new URLSearchParams(params);
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });
  const data = await res.json();
  return data;
};

export const getRedirectOauthLink = async () => {};

export const getUserData = async (
  code: string
): Promise<ResponseData<OAuthProps>> => {
  const token = await getGoogleToken(code);
  if (!token.id_token) {
    console.error(token);
    return { success: false, message: "" };
  }
  const userData: Partial<UserDB> & JWTPayload = decodeJwt(token.id_token);
  return {
    success: true,
    data: {
      username: `user_G${userData.sub}`,
      email: userData.email || "",
      provider: "google",
    },
  };
};
