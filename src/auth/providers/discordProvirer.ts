"use server";

import { ResponseData } from "@/types";
import { OAuthProps } from "@/zodTypes";

const TOKEN_URL = "https://discord.com/api/oauth2/token	";

export const getDiscordToken = async (code: string) => {
  const params = {
    client_id: process.env.DISCORD_ID!,
    client_secret: process.env.DISCORD_SECRET!,
    code: code,
    redirect_uri: `${process.env.DOMAIN_URL!}/api/auth/callback/discord`,
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

export const getAuthInformation = async (token: string) => {
  const res = fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (await res).json();
};

export const getUserData = async (
  code: string,
): Promise<ResponseData<OAuthProps>> => {
  const token = await getDiscordToken(code);
  if (!token) return { isSuccess: false, message: "wrong token" };
  const userData = await getAuthInformation(token.access_token);
  return {
    isSuccess: true,
    data: {
      username: `user_D${userData.username}`,
      email: userData.email,
      provider: "discord",
    },
  };
};
