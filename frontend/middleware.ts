import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const hasSession = Boolean(req.cookies.get("authjs.session-token")?.value || req.cookies.get("__Secure-authjs.session-token")?.value);
  if (!hasSession) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/saved"]
};