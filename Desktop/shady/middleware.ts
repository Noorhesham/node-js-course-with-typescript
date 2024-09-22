import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const session = cookies().get("token");
  const isLoggedIn = !!session;
  const isSecure = url.pathname.includes("dashboard");
  if (isSecure && !isLoggedIn) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
