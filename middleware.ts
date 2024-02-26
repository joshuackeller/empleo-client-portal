import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const requestHeaders = new Headers(request.headers);

  const pathRegex = /^.*\/\/[^/]+\/(.*)$/;
  const path = request.url.toString().replace(pathRegex, "$1");
  requestHeaders.set("x-path", `/${path}`);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
