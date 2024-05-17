import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export function RootLayout({ children, lang }: { children: React.ReactNode; lang: string }) {
  return (
    <html lang={lang} className={`h-full bg-white ${inter.className}`} suppressHydrationWarning>
      <body className="h-full min-w-[280px]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
