import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("Middleware executed for:", pathname);

  // Public routes that should bypass middleware
  const publicPaths = ["/auth/login", "/auth/signin", "/invitations"];

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    console.log("Skipping middleware for public route:", pathname);
    return NextResponse.next();
  }

  // Check for authentication token
  const authToken = request.cookies.get("accessToken")?.value;
  console.log("Auth Token:", authToken);

  if (!authToken) {
    console.log("No token, redirecting to login...");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  console.log("Token found, allowing access...");
  return NextResponse.next();
}

export const config = {
  matcher: ["/Dashboard/:path*", "/dashboard/:path*"],
};
