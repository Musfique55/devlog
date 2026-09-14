import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import { envVars } from "./env";
import {
  getDefaultDashboardRoute,
  getRoutesOwner,
  isAuthRoute,
  proUserRoutes,
} from "./lib/authUtils";
import { getNewRefreshToken } from "./services/auth.services";
import { isTokenExpiringSoon } from "./lib/tokenUtils";

type UserRole = "SUPER_ADMIN" | "USER";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let user = null;
  let isValidToken = false;

  try {
    if (accessToken) {
      const verify = jwtUtils.verifyToken(accessToken, envVars.JWT_SECRET_KEY);
      isValidToken = verify.success;
      user = jwtUtils.decodedToken(accessToken);
    }
    if (!isValidToken && refreshToken) {
      user = jwtUtils.decodedToken(refreshToken);
    }
  } catch (error) {
    isValidToken = false;
  }

  const isAuth = isAuthRoute(pathname);
  const routeOwner = getRoutesOwner(pathname);

  // proactive refresh token for those who have refresh token
  if (
    (!isValidToken && refreshToken) ||
    (accessToken && (await isTokenExpiringSoon(accessToken)))
  ) {
    try {
      const refreshed = await getNewRefreshToken();

      if (refreshed.success) {
        const response = NextResponse.next();

        response.headers.set("x-token-refreshed", "1");
        response.cookies.set({
          name: "accessToken",
          value: refreshed.data!.accessToken,
          httpOnly: true,
          path: "/",
          sameSite: "none",
          maxAge: 15 * 60,
        });
        response.cookies.set({
          name: "refreshToken",
          value: refreshed.data!.refreshToken,
          httpOnly: true,
          path: "/",
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 7,
        });
        response.cookies.set({
          name: "better-auth.session_token",
          value: refreshed.data!.sessionToken,
          httpOnly: true,
          path: "/",
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 7,
        });

        return response;
      }
    } catch (error) {
      console.log("error on refreshing token", error);
    }
  }

  // authenticated user trying to access auth routes
  if (isAuth) {
    if (isValidToken && user) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(user!.role as UserRole), request.url),
      );
    }
    return NextResponse.next();
  }

  // public routes
  if (routeOwner === null) {
    return NextResponse.next();
  }

  // protected routes
  if (!isValidToken && !refreshToken && routeOwner !== null) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (user) {
    if (pathname.startsWith("/auth/verify-email")) {
      if (isValidToken) {
        if (!user?.emailVerified) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(
            new URL(
              getDefaultDashboardRoute(user?.role as UserRole),
              request.url,
            ),
          );
        }
      } else {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }

    // free user catch
    if (user?.plan === "FREE" && proUserRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/pricing", request.url));
    }

    // admin route
    if (routeOwner === "SUPER_ADMIN" && user?.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(user.role), request.url),
      );
    }

    // prevent admin to access users route
    if (routeOwner === "USER" && user?.role === "SUPER_ADMIN") {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(user.role), request.url),
      );
    }

    if (routeOwner === "WORKSPACE" && user?.role === "SUPER_ADMIN") {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(user.role), request.url),
      );
    }

    if (routeOwner === "COMMON") {
      return NextResponse.next();
    }
  }

  // for users with not verified email

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (unless you want to proxy API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
