import { NextResponse } from "next/server";

export function middleware(request) {
  const auth = request.cookies.get("admin_auth");

  if (!auth && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
