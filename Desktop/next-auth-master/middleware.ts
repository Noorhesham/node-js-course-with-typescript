import NextAuth from "next-auth";
import authConfig from "./auth.config";
const { auth } = NextAuth(authConfig); // we do not want to use the
import { publicRoutes, apiAuthPrefix, authRoutes, defaultLoginRedirect } from "./routes";
export default auth((req)=>{
  //this is a middleware when we want to apply some code on requests to URL that matches the matcher in the config
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isApiRoute) return null;
  if (isAuthRoute) {
    if (isLoggedIn) return Response.redirect(new URL(defaultLoginRedirect, nextUrl));
    return null;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
