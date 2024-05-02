import { type Viewport } from "next"

import "./globals.css"

export const viewport: Viewport = {
  themeColor: "#18b83d",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
