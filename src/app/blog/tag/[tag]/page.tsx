import { Metadata } from "next"

import { getCachedBlogPosts, getCachedBlogTags } from "@/lib/cms/fetchers"
import { Headline } from "@/components/layout/headline"
import { tagToString } from "@/lib/cms/blog-posts"
import { BlogPostList } from "@/components/blog-post-list"
import { blogPage, pageTitle } from "@/content/config"
import { BreadcrumbList, WithContext } from "schema-dts"
import { host } from "@/lib/next"

export async function generateStaticParams() {
  return (await getCachedBlogTags()).map((t) => ({ tag: t.name }))
}

export async function generateMetadata(props: { params: Promise<{ tag: string }> }): Promise<Metadata | null> {
  const params = await props.params
  const tags = await getCachedBlogTags()
  const tag = tags.find((t) => t.name === params.tag)
  if (!tag) {
    return null
  }
  const description = `All blog articles with the tag ${tag.label}.`
  return {
    alternates: {
      canonical: tag.canonical,
    },
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

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params
  const postsWithTag = (await getCachedBlogPosts()).filter((p) => p.tags.includes(params.tag))
  const tagName = tagToString(params.tag)

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: `https://${host}${blogPage}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tagName,
      },
    ],
  }

  return (
    <div className="mx-auto max-w-screen-md">
      <Headline subtitle="Blog articles with this tag.">Topic: {tagName}</Headline>
      <BlogPostList posts={postsWithTag} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </div>
  )
}
