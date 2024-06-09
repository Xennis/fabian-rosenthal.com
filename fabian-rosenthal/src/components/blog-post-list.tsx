import NextLink from "next/link"
import { CalendarIcon, TagIcon } from "@heroicons/react/24/outline"

import { Link } from "@/components/layout/link"
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

export const BlogPostList = ({ posts }: { posts: Array<BlogPost> }) => {
  return (
    <ul className="ms-6 list-outside list-disc py-1 leading-7 text-gray-700">
      {posts.map((p, index) => (
        <li className="py-1" key={index}>
          <Link href={blogPagePost(i18n.defaultLocale, p.slug)}>{p.title}</Link>
          <div className="gap-3 py-1 text-sm text-gray-600 md:flex md:flex-row">
            <div className="flex gap-1">
              <CalendarIcon title="Published" aria-hidden={true} className="h-5 w-5" />
              <span className="sr-only">Published: </span>
              <span>{formatDate(p.publishDate, i18n.defaultLocale)}</span>
            </div>
            <div className="flex gap-1.5 pt-3 md:pt-0">
              <TagIcon title="Tags" aria-hidden={true} className="h-5 w-5" />
              {/* The list itself has an aria label */}
              <BlogTagList tags={p.tags} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
