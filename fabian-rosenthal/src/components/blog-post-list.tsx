import { Link } from "@/components/layout/link"
import { blogPagePost, blogTagPage } from "@/content/config"
import { BlogPost, Tag, tagToString } from "@/lib/cms/blog-posts"
import { i18n } from "@/content/i18n"
import { cn } from "@react-notion-cms/render/dist/util"
import NextLink from "next/link"

const TagChip = ({ tag }: { tag: Tag }) => {
  // FIXME: no-underline only needed because global style applies
  return (
    <NextLink
      className={cn("rounded-xl bg-slate-900 px-2 py-1 text-xs text-white hover:bg-slate-700", "no-underline")}
      href={blogTagPage(i18n.defaultLocale, tag)}
    >
      {tagToString(tag)}
    </NextLink>
  )
}

export const BlogPostList = ({ posts }: { posts: Array<BlogPost> }) => {
  return (
    <ul className="ms-6 list-outside list-disc py-1 leading-7 text-gray-700">
      {posts.map((p, index) => (
        <li className="py-1" key={index}>
          <Link href={blogPagePost(i18n.defaultLocale, p.slug)}>{p.title}</Link>
          <div className="flex flex-row gap-2 py-0">
            <span>
              {/* FIXME: Somehow the date is here sometimes a string  */}
              {new Date(p.publishDate).toLocaleDateString(i18n.defaultLocale, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <ul aria-label="Tags" className="flex gap-1">
              {p.tags.map((t, index) => (
                <li key={index}>
                  <TagChip tag={t} />
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  )
}
