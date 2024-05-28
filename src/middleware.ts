import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // check if the request from a public path
  const publicPaths = [
    "/login",
    "/sign-up",
    "/verifyemail",
    "/verifypassword",
    "/forgot-password",
  ];
  let isPublicPath = false;
  for (let item of publicPaths) {
    if (item === path) isPublicPath = true;
  }
  // get the cookie if it's exist
  const token = request.cookies.get("token")?.value;
  // now check if the request is to public path |and| the token is exist
  if (isPublicPath && token) {
    // i should redirect the user to the home page cuz he already authrized
    return NextResponse.redirect(new URL("/", request.url));
  }
  /* 
    here check if the request is not to a public path |and| the token is not exist 
    i should redirect the user and let him login first or create an accunt 
  */
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/login",
    "/sign-up",
    "/verifyemail",
    "/forgot-password",
    "/verifypassword",
  ],
};
