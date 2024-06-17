import NextLink from "next/link"
import { CalendarIcon, TagIcon } from "@heroicons/react/24/outline"
import NextImage from "next/image"

import { blogPagePost, blogTagPage } from "@/content/config"
import { BlogPost, Tag, tagToString } from "@/lib/cms/blog-posts"
import { i18n } from "@/content/i18n"
import { formatDate } from "@/lib/date"

const TagChip = ({ tag }: { tag: Tag }) => {
  return (
    <NextLink
      className={"rounded-xl bg-slate-800 px-2 py-1 text-xs text-white hover:bg-slate-600"}
      href={blogTagPage(i18n.defaultLocale, tag)}
    >
      {tagToString(tag)}
    </NextLink>
  )
}

export const BlogTagList = ({ tags }: { tags: Array<Tag> }) => {
  return (
    <ul aria-label="Tags" className="flex gap-1.5">
      {tags.map((t, index) => (
        <li key={index}>
          <TagChip tag={t} />
        </li>
      ))}
    </ul>
  )
}

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <>
      <NextLink href={blogPagePost(i18n.defaultLocale, post.slug)}>
        <div className="group flex flex-col-reverse justify-between gap-5 sm:flex-row sm:gap-7">
          <div className="flex-1">
            <h2 className="pb-2 text-xl font-semibold group-hover:text-[#18b83d] sm:text-2xl">{post.title}</h2>
            <p className="leading-7 text-gray-700">{post.metaDescription}</p>
          </div>
          <div className="relative aspect-video w-full sm:h-[140px] sm:w-[267px]">
            {post.ogImage && (
              <NextImage src={post.ogImage} alt="Alt image" className="rounded-md sm:rounded-lg" fill quality={85} />
            )}
          </div>
        </div>
        <div className="gap-3 pt-4 text-sm text-gray-600 md:flex md:flex-row">
          <div className="flex gap-1">
            <CalendarIcon title="Published" aria-hidden={true} className="h-5 w-5" />
            <span className="sr-only">Published: </span>
            <span>{formatDate(post.publishDate, i18n.defaultLocale)}</span>
          </div>
          <div className="flex gap-1.5 pt-3 md:pt-0">
            <TagIcon title="Tags" aria-hidden={true} className="h-5 w-5" />
            {/* The list itself has an aria label */}
            <BlogTagList tags={post.tags} />
          </div>
        </div>
      </NextLink>
    </>
  )
}

export const BlogPostList = ({ posts }: { posts: Array<BlogPost> }) => {
  return (
    <ul>
      {posts.map((p, index) => (
        <li className="mb-2 border-b border-gray-100 py-8 last:mb-0 last:border-b-0" key={index}>
          <BlogPostCard post={p} />
        </li>
      ))}
    </ul>
  )
}
