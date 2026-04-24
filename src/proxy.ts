import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GONE_PATHS = new Set([
  "/regulations/federal-ai-guidance",
  "/regulations/oecd-ai-principles",
  "/regulations/sr-11-7",
  "/regulations/fair-housing-act",
  "/regulations/eeoc-guidelines",
]);

export function proxy(request: NextRequest) {
  if (GONE_PATHS.has(request.nextUrl.pathname)) {
    return new NextResponse("410 Gone", { status: 410 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/regulations/:slug*",
};
