export const formatDate = (date: Date | string, lang: string) => {
  return new Date(date).toLocaleDateString(lang, {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
