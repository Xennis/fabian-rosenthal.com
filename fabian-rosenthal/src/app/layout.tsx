import { type Metadata, type Viewport } from "next"

import "./globals.css"
import { brandColor, pageTitle } from "@/content/config"
import { getHost } from "@/lib/next"

export const metadata: Metadata = {
  //description: not set here due to lang
  openGraph: {
    //description, type, siteName: not set here due to lang
    title: {
      default: pageTitle,
      template: `%s - ${pageTitle}`,
    },
  },
  metadataBase: new URL(`https://${getHost()}`),
  robots: {
    index: true,
    follow: true,
  },
  title: {
    default: pageTitle,
    template: `%s - ${pageTitle}`,
  },
}

export const viewport: Viewport = {
  themeColor: brandColor,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
