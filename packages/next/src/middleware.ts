import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";
import { device_uuid, refresh_token } from "./constants";
import { sso_url } from "./urls";

export async function noAuthMiddleware(
  request: NextRequest,
  publicRouteStartsWith: string[] = [],
) {
  if (
    publicRouteStartsWith.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    )
  ) {
    return NextResponse.next();
  }
  const nextUrl = request.nextUrl;
  const did = nextUrl.searchParams.get(device_uuid);
  const rt = nextUrl.searchParams.get(refresh_token);
  nextUrl.searchParams.delete(device_uuid, did as string);
  nextUrl.searchParams.delete(refresh_token, rt as string);

  if (did && rt) {
    const response = NextResponse.redirect(nextUrl);
    response.cookies.set({
      name: device_uuid,
      value: did,
      httpOnly: true,
      priority: "high",
      secure: true,
      sameSite: true,
      path: "/",
    });

    response.cookies.set({
      name: refresh_token,
      value: rt,
      httpOnly: true,
      priority: "high",
      secure: true,
      sameSite: true,
      path: "/",
    });

    return response;
  }

  const cookies = request.cookies;
  if (!cookies.has(device_uuid) || !cookies.has(refresh_token)) {
    return NextResponse.redirect(sso_url);
  }

  return NextResponse.next();
}
