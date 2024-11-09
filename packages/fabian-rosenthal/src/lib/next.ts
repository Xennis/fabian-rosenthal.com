const getHost = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    const url = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    if (url) {
      return url
    }
  }
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
    const url = process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL
    if (url) {
      return url
    }
  }
  return `localhost:${process.env.PORT || 3000}`
}

export const host = getHost()
