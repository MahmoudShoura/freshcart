import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/cart",
  "/checkout",
  "/orders",
  "/wishlist",
  "/profile",
];

const AuthRoutes = [
  "/login",
  "/signup",
  "/forgotten-password",
  "/reset-forgotten-password"
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl; //*   /card   /orders    /login
  const token = request.cookies.get("token")?.value || null;

  const isAuthenticated = !!token;

  const isprotectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isprotectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const isAuthRoutes = AuthRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isAuthRoutes && isAuthenticated) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/checkout/:path*",
    "/cart/:path*",
    "/wishlist/:path*",
    "/orders/:path*",

    "/login",
    "/signup",
    "/forgotten-password",
    "/reset-forgotten-password",
  ],
};
