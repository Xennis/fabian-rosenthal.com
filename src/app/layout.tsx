import type {Metadata, Viewport} from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { classNames } from "@/lib/tw"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  description:
    "My site features articles and insight about solo software businesses and micro SaaS: Starting a business as a software developer. Finding and validating software ideas.",
  openGraph: {
    description:
      "My site features articles and insight about solo software businesses and micro SaaS: Starting a business as a software developer. Finding and validating software ideas.",
    title: "Fabian Rosenthal",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  title: "Fabian Rosenthal",
}

export const viewport: Viewport = {
  themeColor: "#18b83d",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={classNames("h-full bg-white", inter.className)} suppressHydrationWarning>
      <body className="h-full border-t-8 border-[#18b83d]" suppressHydrationWarning>
        <Header />
        <div className="mx-auto max-w-screen-xl">
          <main className="pxcontent py-7">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
