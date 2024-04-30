import NextLink from "next/link"
import NextImage from "next/image"

import authorImage from "@/images/author-75x75.png"
import { aboutPage, homePage, newsletterPage } from "@/lib/links"

const navLinks = [
  // { label: "Newsletter", href: newsletterPage },
  // {label: "Articles", href: "/newsletter", target: "_blank"},
  { label: "YouTube", href: "https://www.youtube.com/@fabian.rosenthal", target: "_blank" },
  { label: "About", href: aboutPage },
]

function Logo() {
  return (
    <div>
      <NextLink aria-label="Home" href={homePage} className="group flex items-center">
        <NextImage className="rounded" src={authorImage} alt="Profile picture of Fabian" width={75} unoptimized />
        <div className="ps-3">
          <span className="text-xl font-semibold tracking-tight group-hover:text-[#18b83d]">Fabian Rosenthal</span>
          <br />
          <span>
            <span className="hidden sm:inline">The Enthusiastic </span>Software Engineer
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

export function Header() {
  return (
    <header className="w-full bg-gray-100">
      <nav className="pxcontent mx-auto max-w-screen-xl py-7 md:flex md:items-center md:justify-between">
        <Logo />
        <div className="flex justify-center space-x-6 pt-5 md:justify-normal md:space-x-4 md:pt-0">
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
