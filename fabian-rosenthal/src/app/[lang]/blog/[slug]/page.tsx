import { notFound } from "next/navigation"
import { CalendarIcon, TagIcon } from "@heroicons/react/24/outline"
import { Metadata } from "next"
import NextLink from "next/link"
import "@react-notion-cms/render/dist/styles.css"

import { i18n } from "@/content/i18n"
import { getCachedBlogPosts, getCachedPageContent } from "@/lib/cms/fetchers"
import { HeadlineBlog } from "@/components/layout/headline"
import { apiDisableDraft, blogPage, pageTitle } from "@/content/config"
import { Render } from "@react-notion-cms/render"
import { Code } from "@/components/cms/code"
import { Link } from "@/components/layout/link"
import { BlogTagList } from "@/components/blog-post-list"
import { formatDate } from "@/lib/date"
import { type BlogPost } from "@/lib/cms/blog-posts"
import { draftMode } from "next/headers"
import { fetchPageContent } from "@/lib/cms/fetch"

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
      images: post.ogImage ?? undefined,
      siteName: pageTitle,
      title: post.title,
      type: "article",
    },
    title: post.title,
  }
}

const BlogMeta = ({ lang, post }: { lang: string; post: BlogPost }) => {
  return (
    <div className="flex flex-col gap-y-3 text-sm text-slate-600">
      <div className="flex flex-row space-x-2">
        <CalendarIcon title="Publish date" aria-hidden={true} className="h-5 w-5" />
        <div>
          <span className="sr-only">Publish date: </span>
          {formatDate(post.publishDate, lang)}
          <span className="px-2">·</span>
          Published in <Link href={blogPage(lang)}>Blog</Link>
        </div>
      </div>
      <div className="flex flex-row space-x-2">
        <TagIcon title="Topics" aria-hidden={true} className="h-5 w-5" />
        <div>
          <span className="sr-only">Topics: </span>
          <BlogTagList tags={post.tags} />
        </div>
      </div>
    </div>
  )
}

export default async function BlogSlugPage({ params }: { params: { lang: string; slug: string } }) {
  const { isEnabled } = draftMode()
  const posts = await getCachedBlogPosts()
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) {
    notFound()
  }

  const content = isEnabled ? await fetchPageContent(post.notionId) : await getCachedPageContent(post.notionId)

  return (
    <>
      {isEnabled && (
        <div className="mb-10 rounded-lg bg-red-300 p-4 text-center">
          <div className="text-lg">
            Draft Mode (
            <NextLink className="underline hover:no-underline" href={apiDisableDraft} target="_blank">
              disable
            </NextLink>
            )
          </div>
          <div>
            Page:{" "}
            <a
              className="underline hover:no-underline"
              href={`https://www.notion.so/${post.notionId.replaceAll("-", "")}`}
              target="_blank"
            >
              {post.notionId.replaceAll("-", "")}
            </a>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-screen-md">
        <HeadlineBlog subtitle={post.pageSubtitle ?? undefined}>{post.title}</HeadlineBlog>
        <div className="my-5 border-y border-gray-100 py-4">
          <BlogMeta lang={params.lang} post={post} />
        </div>
      </div>
      {post.ogImage !== null && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.ogImage}
          alt="Blog image"
          width={825}
          className="mx-auto my-8 rounded-lg shadow-md sm:my-10 sm:rounded-xl sm:shadow-lg"
        />
      )}
      <div className="mx-auto max-w-screen-md">
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
              // eslint-disable-next-line @next/next/no-img-element
              img: (props) => <img alt={props.alt} {...props} className="mx-auto rounded" />,
            },
          }}
        />
      </div>
    </>
  )
}
