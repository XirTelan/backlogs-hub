"use server";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

export const getToken = async (code: string) => {
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

export const authorize = () => {};
