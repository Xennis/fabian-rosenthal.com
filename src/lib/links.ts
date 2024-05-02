// We are generating a static page. In case we switch to a dynamic page we can use the following directly in the
// robots.ts and sitemap.ts:
//
// const headersList = headers()
// const host = headersList.get("host")!
export const host = "fabian-rosenthal.com"

export const aboutPage = (lang: string) => `/${lang}/about`
export const homePage = (lang: string) => `/${lang}`
export const legalNoticePage = (lang: string) => `/${lang}/legal-notice`
// export const newsletterPage = "/newsletter"
