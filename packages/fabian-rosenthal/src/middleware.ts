import { NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: ["/en/:path*", "/de/:path*"],
}

// Forward links with the old lang pattern.
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  // The content of the about page is now on the home page.
  if (path.endsWith("/de") || path.endsWith("/de") || path.endsWith("/about")) {
    const newUrl = new URL("/", req.url)
    console.log(`redirect ${req.url} to ${newUrl}`)
    return NextResponse.redirect(newUrl)
  }

  // Remove lang from URL.
  const newPath = req.nextUrl.pathname.replace("/de/", "/").replace("/en/", "/")
  const newUrl = new URL(newPath, req.url)
  console.log(`redirect ${req.url} to ${newUrl}`)
  return NextResponse.redirect(newUrl)
}
