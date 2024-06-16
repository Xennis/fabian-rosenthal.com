import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"

import { getDictionary } from "@/content/dictionaries"
import { getCollections } from "@/content/collections"
import { classNames } from "@/lib/tw"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { homePage } from "@/content/config"

const inter = Inter({ subsets: ["latin"] })

export function RootLayout({ children, lang }: { children: React.ReactNode; lang: string }) {
  const dictionary = getDictionary(lang)
  const collections = getCollections(lang)

  return (
    <html lang={lang} className={classNames("h-full bg-white", inter.className)} suppressHydrationWarning>
      <body className="h-full min-w-[280px] border-t-8 border-[#18b83d]" suppressHydrationWarning>
        <Header homeHref={homePage(lang)} navLinks={collections.header.navLinks} dictionary={dictionary.header} />
        <div className="mx-auto max-w-screen-xl">
          <main className="pxcontent pb-12 pt-10">{children}</main>
          <Footer
            socialLinks={collections.socialLinks}
            navLinks={collections.footer.navLinks}
            dictionary={dictionary.footer}
          />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
