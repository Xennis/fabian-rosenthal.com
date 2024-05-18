import { type Metadata, type Viewport } from "next"

import "./globals.css"
import { brandColor } from "@/content/config"
import { getMetadata } from "@/content/metadata"

export async function generateMetadata(): Promise<Metadata | null> {
  return getMetadata()
}

export const viewport: Viewport = {
  themeColor: brandColor,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
