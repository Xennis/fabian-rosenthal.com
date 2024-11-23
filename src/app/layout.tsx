import { type Metadata, type Viewport } from "next"
import "./globals.css"
import { brandColor, homePage, locale, pageDescription, pageTitle } from "@/content/config"
import { host } from "@/lib/next"
import { getCollections } from "@/content/collections"
import { classNames } from "@/lib/tw"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  description: pageDescription,
  openGraph: {
    description: pageDescription,
    title: {
      default: pageTitle,
      template: `%s - ${pageTitle}`,
    },
    type: "website",
    siteName: pageTitle,
  },
  metadataBase: new URL(`https://${host}`),
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

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const collections = getCollections()

  return (
    <html lang={locale} className={classNames("h-full bg-white", inter.className)} suppressHydrationWarning>
      <body className="h-full min-w-[280px] border-t-8 border-primary-500" suppressHydrationWarning>
        <Header homeHref={homePage} navLinks={collections.header.navLinks} />
        <div className="mx-auto max-w-screen-xl">
          <main className="pxcontent pb-12 pt-10">{children}</main>
          <Footer socialLinks={collections.socialLinks} navLinks={collections.footer.navLinks} />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
