import { NextResponse, type NextRequest } from "next/server";
import { getTokenData } from "./auth/utils";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value || "";
  let userData = null;
  if (token) {
    const { payload } = await getTokenData(token);
    if (!payload) {
      const response = NextResponse.next();
      response.cookies.delete("access_token");
      return response;
    }
    userData = payload;
  }
  if (request.nextUrl.pathname === "/" && userData)
    return NextResponse.redirect(
      new URL(`/user/${userData.username}`, request.nextUrl),
    );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

