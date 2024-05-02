import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"

import { getDictionary } from "@/content/i18n/dictionaries"
import { getPiece } from "@/content/i18n/pieces"
import { classNames } from "@/lib/tw"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { homePage } from "@/lib/links"

const inter = Inter({ subsets: ["latin"] })

export function RootLayout({ children, lang }: { children: React.ReactNode; lang: string }) {
  const dictionary = getDictionary(lang)
  const piece = getPiece(lang)

  return (
    <html lang={lang} className={classNames("h-full bg-white", inter.className)} suppressHydrationWarning>
      <body className="h-full min-w-[280px] border-t-8 border-[#18b83d]" suppressHydrationWarning>
        <Header homeHref={homePage(lang)} navLinks={piece.header.navLinks} dictionary={dictionary.header} />
        <div className="mx-auto max-w-screen-xl">
          <main className="pxcontent py-7">{children}</main>
          <Footer socialLinks={piece.socialLinks} navLinks={piece.footer.navLinks} dictionary={dictionary.footer} />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
