import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const localeMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],
  localePrefix: "always",

  // Used when no locale matches
  defaultLocale: "en",
});

export async function middleware(req: NextRequest) {
  // Access cookies
  const cookies = req.cookies.getAll();

  // Access the requested path
  const path = req.nextUrl.pathname;
  console.log("Requested path:", path);

  // Run the next-intl middleware to handle locales
  const response = localeMiddleware(req);
  // Custom response logic
  // Example: Setting a custom header

  return localeMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*", "/((?!.*\\..*|_next).*)"],
};
