import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicPaths = ["/auth/login", "/auth/signin", "/invitations"];

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  const authToken = request.cookies.get("accessToken")?.value;

  if (!authToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/Dashboard/:path*", "/dashboard/:path*"],
};
