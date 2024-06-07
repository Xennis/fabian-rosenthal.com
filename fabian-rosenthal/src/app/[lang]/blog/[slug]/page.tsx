import { notFound } from "next/navigation"

import { i18n } from "@/content/i18n"
import { getCachedBlogPosts, getCachedPageContent } from "@/lib/cms/fetchers"
import { Headline } from "@/components/layout/headline"
import { Metadata } from "next"
import { pageTitle } from "@/content/config"
import { Render } from "@react-notion-cms/render"
import { Code } from "@/components/cms/code"

export async function generateStaticParams({ params }: { params: { lang: string; tag: string } }) {
  // TODO: Remove here + add sitemap
  if (process.env.VERCEL_ENV === "production") {
    // If nothing is returned an error is raised, i.e. the build fails
    return [{ slug: "abc" }]
  }
  if (params.lang !== i18n.defaultLocale) {
    return []
  }
  return (await getCachedBlogPosts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string }
}): Promise<Metadata | null> {
  const posts = await getCachedBlogPosts()
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) {
    notFound()
  }

  return {
    description: post.title,
    openGraph: {
      description: post.metaDescription,
      siteName: pageTitle,
      title: post.title,
      type: "article",
    },
    title: post.title,
  }
}

export default async function BlogSlugPage({ params }: { params: { lang: string; slug: string } }) {
  const posts = await getCachedBlogPosts()
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) {
    notFound()
  }
  const content = await getCachedPageContent(post.notionId)

  return (
    <>
      <Headline>{post.title}</Headline>
      <div className="max-width-regular">
        <Render
          blocks={content}
          options={{
            formatDateFn: (date: Date) => date.toLocaleDateString(params.lang),
            resolveLinkFn: (nId) => null,
            htmlComponents: {
              code: (props) => <Code {...props} />,
            },
          }}
        />
      </div>
    </>
  )
}
