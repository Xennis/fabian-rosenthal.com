// We are generating a static page. In case we switch to a dynamic page we can use the following directly in the
// robots.ts and sitemap.ts:
//
// const headersList = headers()
// const host = headersList.get("host")!
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
  return "localhost:3000"
}

export const host = getHost()

export const aboutPage = (lang: string) => `/${lang}/about`
export const blogPage = (lang: string) => `/${lang}/blog`
export const blogPagePost = (lang: string, slug: string) => `/${lang}/blog/${slug}`
export const blogTagPage = (lang: string, tag: string) => `/${lang}/blog/tag/${tag}`
export const businessIdeasPage = (lang: string, slug: string) => `/${lang}/guides/business-ideas/${slug}`
export const homePage = (lang: string) => `/${lang}`
export const legalPage = (lang: string) => `/${lang}/legal`
export const newsletterPage = (lang: string) => `/${lang}/newsletter`
export const voluntarySupport = (lang: string) => `/${lang}/voluntary-support`

export const brandColor = "#18b83d"

export const pageTitle = "Fabian Rosenthal"
