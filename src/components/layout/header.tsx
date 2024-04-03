import NextLink from "next/link"
import NextImage from "next/image"

import authorImage from "@/images/author.png"
import { aboutPage, homePage } from "@/lib/links"

const navLinks = [
  // {label: "Newsletter", href: "/newsletter", target: "_blank"},
  // {label: "Articles", href: "/newsletter", target: "_blank"},
  { label: "About", href: aboutPage, target: undefined },
  // {label: "YouTube", href: "https://www.youtube.com/@fabian.rosenthal", target: "_blank"},
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
    <NextLink href={href} target={target} className="px-2 py-1 text-slate-700 hover:text-[#18b83d]">
      {children}
    </NextLink>
  )
}

export function Header() {
  return (
    <header className="w-full bg-gray-100">
      <nav className="pxcontent mx-auto flex max-w-screen-xl items-center justify-between py-7">
        <Logo />
        <div>
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
