import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { authRoutes, protectedRoutes } from "./routes";
import { cookies } from "next/headers";

const localeMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],
  localePrefix: "always",

  // Used when no locale matches
  defaultLocale: "en",
});

export async function middleware(req: NextRequest, res: NextResponse) {
  // Access cookies
  const token = req.cookies.get("jwt")?.value;
  const lang = req.cookies.get("NEXT_LOCALE")?.value;
  console.log("token", token);
  // Access the requested path
  const path = req.nextUrl;
  const url = req.nextUrl.pathname.replace(`/${lang}`, "");
  const isProtectedRoute = protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/\[.*\]/, ".*")}$`);
    return regex.test(url);
  });
  const isAuthRoute = authRoutes.includes(url);
  if (token === "undefined") cookies().delete("jwt");
  // Run the next-intl middleware to handle locales
  if ((!token || token === "undefined") && isProtectedRoute) {
    let pathn = path.pathname.replace(`/${lang}`, "");
    path.pathname = `/login`;
    path.searchParams.set("redirect", pathn);
    return NextResponse.redirect(path);
  }
  if (token && isAuthRoute) {
    path.pathname = "/";
    NextResponse.redirect(path);
  }
  // Custom response logic
  // Example: Setting a custom header

  return localeMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*", "/((?!.*\\..*|_next).*)"],
};
