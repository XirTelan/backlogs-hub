"use server";
import { JWTPayload, JWTVerifyResult, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const EXPIRATION_TIME = "7d";

export const getTokenData = async (token: string) => {
  try {
    const tokenData: JWTVerifyResult<JWTPayload & TokenData> = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.AUTH_SECRET!),
    );
    return tokenData;
  } catch (error) {
    return { error: error, payload: null };
  }
};

export const getCurrentUserInfo = async (): Promise<TokenData | null> => {
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
    .setExpirationTime(EXPIRATION_TIME)
    .sign(secret);
  return access_token;
};

type TokenData = {
  id: string;
  username: string;
  role: string;
};
