import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Define public paths
  const publicPaths = ["/login", "/signup" ,"/verifyemail"];
  const isPublicPath = publicPaths.includes(path);

  // 2. Extract token
  const token = request.cookies.get("token")?.value || "";

  // 3. Logic: Redirect authenticated users away from public pages 
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // 4. Logic: Redirect unauthenticated users to login if they try to access private pages
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

// 5. Matcher Configuration
export const config = {
  matcher: [
    "/",
    "/profile/:path*", // Matches /profile and any sub-paths
    "/login",
    "/signup",
    '/verifyemail'
  ],
};