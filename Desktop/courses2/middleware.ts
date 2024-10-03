import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const localeMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],
  localePrefix: "always",

  // Used when no locale matches
  defaultLocale: "en",
});

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoggedIn = !!session;
  const isSecure = url.pathname.includes("dashboard");
  const locale = req.cookies.get("NEXT_LOCALE")?.value || "en";
  req.headers.set("locale", locale);
  if (isLoggedIn && url.pathname.includes("login")) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }
  if (isSecure && !isLoggedIn) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  if (!req.url.includes("/api")) {
    return localeMiddleware(req);
  }
}
export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*", "/((?!.*\\..*|_next).*)"],
};
