"use server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const getTokenData = async (token: string) => {
  "use server";
  try {
    const tokenData = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.AUTH_SECRET!),
    );
    return tokenData;
  } catch (error) {
    return { error: error, payload: null };
  }
};

export const getCurrentUserInfo = async () => {
  const token = cookies().get("access_token")?.value || "";
  const { payload } = await getTokenData(token);
  if (!payload) return null;
  return {
    id: payload.id,
    username: payload.username,
    role: payload.role,
  };
};
