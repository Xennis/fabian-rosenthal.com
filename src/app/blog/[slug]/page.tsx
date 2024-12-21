import { notFound } from "next/navigation"
import { CalendarIcon, TagIcon } from "@heroicons/react/24/outline"
import { Metadata } from "next"
import NextLink from "next/link"
import { draftMode } from "next/headers"
import { Article, BreadcrumbList, WithContext } from "schema-dts"
import NextImage from "next/image"
import "@xennis/react-notion-cms-render/dist/styles.css"
import { getCachedBlogPosts, getCachedPageContent } from "@/lib/cms/fetchers"
import { HeadlineBlog } from "@/components/layout/headline"
import { apiDisableDraft, blogPage, pageTitle } from "@/content/config"
import { Render } from "@xennis/react-notion-cms-render"
import { Code } from "@/components/cms/code"
import { Link } from "@/components/layout/link"
import { BlogTagList } from "@/components/blog-post-list"
import { formatDate } from "@/lib/date"
import { type BlogPost } from "@/lib/cms/blog-posts"
import { fetchPageContent } from "@/lib/cms/fetch"
import { host } from "@/lib/next"

export async function generateStaticParams() {
  return (await getCachedBlogPosts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata | null> {
  const params = await props.params
  const posts = await getCachedBlogPosts()
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) {
    notFound()
  }

  return {
    alternates: {
      canonical: post.canonical,
    },
    description: post.metaDescription,
    openGraph: {
      description: post.metaDescription,
      images: post.ogImage ?? undefined,
      siteName: pageTitle,
      title: post.title,
      type: "article",
      url: post.canonical,
      // article namespace
      modifiedTime: new Date(post.lastEdited).toISOString(),
      publishedTime: new Date(post.publishDate).toISOString(),
    },
    title: post.title,
  }
}

const BlogMeta = ({ post }: { post: BlogPost }) => {
  return (
    <div className="flex flex-col gap-y-3 text-sm text-onbackground-600">
      <div className="flex flex-row space-x-2">
        <CalendarIcon title="Publish date" aria-hidden={true} className="h-5 w-5" />
        <div>
          <span className="sr-only">Publish date: </span>
          {formatDate(post.publishDate)}
          <span className="px-2">·</span>
          Published in <Link href={blogPage}>Blog</Link>
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

export default async function BlogSlugPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const { isEnabled } = await draftMode()
  const posts = await getCachedBlogPosts()
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) {
    notFound()
  }

  const content = isEnabled ? await fetchPageContent(post.notionId) : await getCachedPageContent(post.notionId)
  const postJsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.ogImage !== null ? post.ogImage : undefined,
    datePublished: new Date(post.publishDate).toISOString(),
    dateModified: new Date(post.lastEdited).toISOString(),
    author: {
      "@type": "Person",
      name: "Fabian Rosenthal",
    },
  }
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
        name: post.title,
      },
    ],
  }

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
          <BlogMeta post={post} />
        </div>
      </div>
      {post.ogImage !== null && (
        <div className="relative mx-auto my-8 aspect-[1.91/1] w-full sm:my-10 md:max-w-[825px]">
          <NextImage
            src={post.ogImage}
            alt="Blog image"
            fill
            className="rounded-lg shadow-md sm:rounded-xl sm:shadow-lg"
            quality={100}
          />
        </div>
      )}
      <div className="mx-auto max-w-screen-md">
        <Render
          blocks={content}
          options={{
            formatDateFn: (dateString) => formatDate(dateString),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  )
}
