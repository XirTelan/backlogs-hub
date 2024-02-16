import { getToken } from "@/auth/googleProviders";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { sendErrorMsg } from "@/utils";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest, { params }) {
  const isCallback = params.auth[0] === "callback";
  const provider = params.auth[1];
  if (isCallback && provider === "google") {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    if (!code) return sendErrorMsg("Message");
    const token = await getToken(code);
    const userData = jwtDecode(token.id_token);
    await dbConnect();
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      const newUser = new User({
        username: `user_${userData.sub}`,
        email: userData.email,
      });
      await newUser.save();
    }
    const tokenData = { id: user._id, username: user.username, role: "user" };
    const access_token = jwt.sign(tokenData, process.env.AUTH_SECRET!, {
      expiresIn: "1d",
    });
    const response = new NextResponse("So...");
    response.cookies.set("access_token", access_token, { httpOnly: true });
    return response;
  }

  return NextResponse.json(null);
}
