import NextLink from "next/link"
import { CalendarIcon, TagIcon } from "@heroicons/react/24/outline"
import NextImage from "next/image"

import { blogPagePost, blogTagPage } from "@/content/config"
import { BlogPost, Tag, tagToString } from "@/lib/cms/blog-posts"
import { formatDate } from "@/lib/date"

const TagChip = ({ tag }: { tag: Tag }) => {
  return (
    <NextLink
      className="bg-onbackground-800 hover:bg-primary-500 hover:text-onbackground-900 rounded-xl px-2 py-1 text-xs text-white"
      href={blogTagPage(tag)}
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
    <div>
      <NextLink
        href={blogPagePost(post.slug)}
        className="group flex flex-col-reverse justify-between gap-5 sm:flex-row sm:gap-7"
      >
        <div className="flex-1">
          <h2 className="group-hover:text-primary-500 pb-2 text-xl font-semibold sm:text-2xl">{post.title}</h2>
          <p className="leading-7 text-gray-700">{post.metaDescription}</p>
        </div>
        <div>
          <div className="relative aspect-[1.91/1] w-full sm:w-[267px]">
            {post.ogImage && (
              <NextImage src={post.ogImage} alt="Post image" className="rounded-md sm:rounded-lg" fill quality={100} />
            )}
          </div>
        </div>
      </NextLink>
      <div className="gap-3 pt-4 text-sm text-gray-600 md:flex md:flex-row">
        <div className="flex gap-1">
          <CalendarIcon title="Published" aria-hidden={true} className="h-5 w-5" />
          <span className="sr-only">Published: </span>
          <span>{formatDate(post.publishDate)}</span>
        </div>
        <div className="flex gap-1.5 pt-3 md:pt-0">
          <TagIcon title="Tags" aria-hidden={true} className="h-5 w-5" />
          {/* The list itself has an aria label */}
          <BlogTagList tags={post.tags} />
        </div>
      </div>
    </div>
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
