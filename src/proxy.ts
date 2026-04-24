import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const protectedRoutes = [
    "/checkout",
    "/allorders",
    "/profile",
  ];
  const authRoutes = ["/Login", "/register"];

  const myPath = request.nextUrl.pathname;

  const myToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const token = myToken?.routeToken;

  if (!token && protectedRoutes.some((path) => myPath.startsWith(path))) {
    return NextResponse.redirect(new URL("/Login", request.nextUrl));
  }

  if (token && authRoutes.some((path) => myPath.startsWith(path))) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [  
    "/checkout/:path*",
    "/allorders/:path*",
    "/profile/:path*",
    "/Login",
    "/register",
  ],
};
