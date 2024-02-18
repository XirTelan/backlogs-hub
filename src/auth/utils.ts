"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const getTokenData = async (token: string) => {
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

export const generateAccessToken = async (user: {
  _id: string;
  username: string;
  role: string;
}) => {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);
  const tokenData = { id: user._id, username: user.username, role: "user" };
  const access_token = await new SignJWT(tokenData)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime("1h")
    .sign(secret);

  return access_token;
};

