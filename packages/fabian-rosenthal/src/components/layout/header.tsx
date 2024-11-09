import NextLink from "next/link"
import NextImage from "next/image"

import authorImage from "@/content/images/author-75x75.png"
import { pageTitle } from "@/content/config"

function Logo({ homeHref }: { homeHref: string }) {
  return (
    <div>
      <NextLink title="Home" aria-label="Home" href={homeHref} className="group flex items-center">
        <NextImage
          className="rounded"
          src={authorImage}
          alt="Profile picture of Fabian"
          width={75}
          height={75}
          quality={100}
        />
        <div className="ps-3">
          <span className="text-xl font-semibold tracking-tight group-hover:text-[#18b83d]">{pageTitle}</span>
          <br />
          <span>
            <span className="hidden sm:inline">The Enthusiastic </span>
            Software Engineer
          </span>
        </div>
      </NextLink>
    </div>
  )
}

function NavLink({
  href,
  target,
  children,
}: {
  href: string
  target?: React.HTMLAttributeAnchorTarget
  children: React.ReactNode
}) {
  return (
    <NextLink
      href={href}
      target={target}
      className="py-1 font-semibold text-slate-700 underline decoration-[#18b83d] decoration-2 hover:no-underline"
    >
      {children}
    </NextLink>
  )
}

export function Header({
  homeHref,
  navLinks,
}: {
  homeHref: string
  navLinks: Array<{ label: string; href: string; target?: React.HTMLAttributeAnchorTarget }>
}) {
  return (
    <header className="w-full bg-gray-100">
      <nav className="pxcontent mx-auto max-w-screen-xl py-7 md:flex md:items-center md:justify-between">
        <Logo homeHref={homeHref} />
        <div className="flex items-center justify-center space-x-6 pt-5 md:justify-normal md:space-x-4 md:pt-0">
          {navLinks.map((l, index) => (
            <NavLink key={index} href={l.href} target={l.target}>
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
