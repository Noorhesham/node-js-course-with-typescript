import { NextRequest, NextResponse } from "next/server";
import { authRoutes } from "./routes";

export async function middleware(req: NextRequest, res: NextResponse) {
  // Access cookies
  const token = req.cookies.get("jwt")?.value;

  // Access the requested path
  const path = req.nextUrl;
  // if (req.nextUrl.pathname.includes("api")) return req;
  const url = req.nextUrl.pathname;
  const isProtectedRoute = url.includes("dashboard");
  const isAuthRoute = authRoutes.includes(url);
  // Run the next-intl middleware to handle locales
  if ((!token) && isProtectedRoute) {
    path.pathname = `/login`;
    return NextResponse.redirect(path);
  }
  if (token && isAuthRoute) {
    req.nextUrl.pathname = "/";
    return NextResponse.redirect(req.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*", "/((?!.*\\..*|_next).*)"],
};
