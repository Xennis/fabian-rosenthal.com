import { locale } from "@/content/config"

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
