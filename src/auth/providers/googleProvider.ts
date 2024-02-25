"use server";

import { UserDTO } from "@/types";
import { JWTPayload, decodeJwt } from "jose";

const TOKEN_URL = "https://oauth2.googleapis.com/token";

export const getGoogleToken = async (code: string) => {
  const params = {
    client_id: process.env.GOOGLE_ID!,
    client_secret: process.env.GOOGLE_SECRET!,
    code: code,
    redirect_uri: `${process.env.DOMAIN_URL!}/api/auth/callback/google`,
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

export const getUserData = async (code: string) => {
  const token = await getGoogleToken(code);
  const userData: Partial<UserDTO> & JWTPayload = decodeJwt(token.id_token);
  return {
    username: `user_G${userData.sub}`,
    email: userData.email || "",
    profileVisibility: "public",
  };
};
