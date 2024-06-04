import { Metadata } from "next"

import { i18n } from "@/content/i18n"
import { getCachedBlogPosts, getCachedBlogTags } from "@/lib/cms/fetchers"
import { Headline } from "@/components/layout/headline"
import { tagToString } from "@/lib/cms/blog-posts"
import { BlogPostList } from "@/components/blog-post-list"
import { pageTitle } from "@/content/config"

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  // TODO: Remove here + add sitemap
  if (process.env.VERCEL_ENV === "production") {
    // If nothing is returned an error is raised, i.e. the build fails
    return [{ slug: "abc" }]
  }
  if (params.lang !== i18n.defaultLocale) {
    return []
  }
  return (await getCachedBlogTags()).map((t) => ({ tag: t }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; tag: string }
}): Promise<Metadata | null> {
  const title = tagToString(params.tag)
  const description = `All blog articles with the tag ${title}.`
  return {
    description: description,
    openGraph: {
      description: description,
      siteName: pageTitle,
      title: title,
      type: "website",
    },
    title: title,
  }
}

export default async function TagPage({ params }: { params: { lang: string; tag: string } }) {
  const postsWithTag = (await getCachedBlogPosts()).filter((p) => p.tags.includes(params.tag))
  return (
    <div className="max-width-regular">
      <Headline>Tag: {tagToString(params.tag)}</Headline>
      <p className="leading-7">Blog articles with this tag:</p>
      <BlogPostList posts={postsWithTag} />
    </div>
  )
}
