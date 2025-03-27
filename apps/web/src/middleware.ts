import { noAuthMiddleware } from "@no-auth/next";
import { NextResponse } from "next/server";
import { MiddlewareConfig, NextRequest } from "next/server";

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export const publicRouteStartsWith: string[] = ["/sso"];

export default async function middleware(request: NextRequest) {
  /**
   * Pre-process
   */

  // return NextResponse.next()

  const response: NextResponse = await noAuthMiddleware(
    request,
    publicRouteStartsWith,
  );

  /**
   * Post-process
   */

  return response;
}
