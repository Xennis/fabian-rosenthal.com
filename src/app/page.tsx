import { redirect } from "next/navigation"

import { i18n } from "@/content/i18n/config"

export default function HomePage() {
  redirect(`/${i18n.defaultLocale}`)
}
