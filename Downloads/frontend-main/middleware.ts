import { NextRequest, NextResponse } from "next/server";
import { authRoutes, protectedRoutes } from "./routes";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest, res: NextResponse) {
  const path = req.nextUrl.pathname;

  // Skip middleware for API routes
  if (path.startsWith("/api")) {
    return NextResponse.next(); // Skip middleware for API routes
  }

  // Access cookies
  const token = req.cookies.get("token")?.value;
  const lang = req.cookies.get("NEXT_LOCALE")?.value;
  console.log(token);
  const url = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/\[.*\]/, ".*")}$`);
    return regex.test(url);
  });
  const isAuthRoute = authRoutes.includes(url);

  if (token === "undefined") cookies().delete("token");

  // Redirect to login if token is missing for protected routes
  if ((!token || token === "undefined") && isProtectedRoute) {
    const redirectPath = req.nextUrl.pathname.replace(`/${lang}`, "");
    req.nextUrl.pathname = `/login`;
    req.nextUrl.searchParams.set("redirect", redirectPath);
    return NextResponse.redirect(req.nextUrl);
  }
  if (token && isAuthRoute) {
    const redirectUrl = req.nextUrl.searchParams.get("redirect");
    if (redirectUrl) {
      req.nextUrl.pathname = redirectUrl;
      req.nextUrl.searchParams.delete("redirect"); // Prevent repeated redirects
      return NextResponse.redirect(req.nextUrl);
    }

    // Handle invalid tokens or login errors
    if (req.nextUrl.searchParams.get("error") === "true") {
      return NextResponse.redirect(req.nextUrl, {
        headers: { "Set-Cookie": "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT" },
      });
    }
    req.nextUrl.pathname = "/";
    return NextResponse.redirect(req.nextUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/((?!.*\\..*|_next|api).*)"],
};
