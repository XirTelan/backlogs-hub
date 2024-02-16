"use server";
const OAUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
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
  console.log("params", params);
  //   const searchParams = new URLSearchParams(params);
  //    `${tokenUrl}?${searchParams}`;
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });
  const data = await res.json();
  console.log(data);
  return data;
};

export const authorize = () => {};

export const getOauthSignInURL = () => {
  const params = {
    client_id: process.env.GOOGLE_ID!,
    redirect_uri: `${process.env.DOMAIN_URL!}/api/auth/callback/google`,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/userinfo.email",
    include_granted_scopes: "true",
  };
  const searchParams = new URLSearchParams(params);
  return `${OAUTH_ENDPOINT}?${searchParams}`;
};
