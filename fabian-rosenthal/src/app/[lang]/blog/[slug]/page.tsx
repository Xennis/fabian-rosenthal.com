import { notFound } from "next/navigation"
import { CalendarIcon, HomeIcon, TagIcon } from "@heroicons/react/24/outline"

import { i18n } from "@/content/i18n"
import { getCachedBlogPosts, getCachedPageContent, getCachedPages } from "@/lib/cms/fetchers"
import { Headline } from "@/components/layout/headline"
import { Metadata } from "next"
import { blogPage, pageTitle } from "@/content/config"
import { Render } from "@react-notion-cms/render"
import { Code } from "@/components/cms/code"
import { Link } from "@/components/layout/link"
import { BlogTagList } from "@/components/blog-post-list"
import { formatDate } from "@/lib/date"

export async function generateStaticParams({ params }: { params: { lang: string; tag: string } }) {
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
      <div className="max-width-regular">
        <Headline>{post.title}</Headline>
        <Render
          blocks={content}
          options={{
            formatDateFn: (date) => formatDate(date, params.lang),
            resolveLinkFn: (nId) => {
              const post = posts.find((p) => p.notionId === nId)
              if (!post) {
                return null
              }
              return { href: post.canonical, icon: null }
            },
            htmlComponents: {
              a: (props) => <Link href={props.href ?? "#"} {...props} />,
              code: (props) => <Code {...props} />,
            },
          }}
        />
        <div className="mt-14 border-t border-gray-100 py-8">
          <div className="flex flex-col gap-y-3 text-sm text-gray-600">
            <div className="flex flex-row space-x-2">
              <CalendarIcon aria-hidden={true} className="h-5 w-5" />
              <div>
                <span>Published: </span>
                {formatDate(post.publishDate, params.lang)}
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <TagIcon aria-hidden={true} className="h-5 w-5" />
              <div className="flex space-x-2">
                <span>Tags: </span>
                <BlogTagList tags={post.tags} />
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <HomeIcon aria-hidden={true} className="h-5 w-5" />
              <div className="">
                <span>Blog: </span>
                <Link href={blogPage(params.lang)}>Read further articles</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
