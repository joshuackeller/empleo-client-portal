import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  // Set organization slug
  const domains = requestHeaders.get("x-forwarded-host")?.split(".");
  if (!domains || domains?.length <= 1) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }
  requestHeaders.set("x-slug", domains[0]);

  const pathRegex = /^.*\/\/[^/]+\/(.*)$/;
  const path = request.url.toString().replace(pathRegex, "$1");
  requestHeaders.set("x-path", `/${path}`);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
