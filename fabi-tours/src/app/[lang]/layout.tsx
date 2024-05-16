import { RootLayout } from "@/components/layout/root-layout"
import { i18n } from "@/content/i18n/config"

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return <RootLayout lang={params.lang}>{children}</RootLayout>
}
