import { type Viewport } from "next"

import "./globals.css"
import { brandColor } from "@/content/config"

export const viewport: Viewport = {
  themeColor: brandColor,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
