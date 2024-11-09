import { Metadata } from "next"

import { getCachedBlogPosts, getCachedBlogTags } from "@/lib/cms/fetchers"
import { Headline } from "@/components/layout/headline"
import { tagToString } from "@/lib/cms/blog-posts"
import { BlogPostList } from "@/components/blog-post-list"
import { pageTitle } from "@/content/config"

export async function generateStaticParams() {
  return (await getCachedBlogTags()).map((t) => ({ tag: t.name }))
}

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata | null> {
  const tags = await getCachedBlogTags()
  const tag = tags.find((t) => t.name === params.tag)
  if (!tag) {
    return null
  }
  const description = `All blog articles with the tag ${tag.label}.`
  return {
    description: description,
    openGraph: {
      description: description,
      siteName: pageTitle,
      title: tag.label,
      type: "website",
    },
    title: tag.label,
  }
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const postsWithTag = (await getCachedBlogPosts()).filter((p) => p.tags.includes(params.tag))
  return (
    <div className="mx-auto max-w-screen-md">
      <Headline subtitle="Blog articles with this tag.">Topic: {tagToString(params.tag)}</Headline>
      <BlogPostList posts={postsWithTag} />
    </div>
  )
}
