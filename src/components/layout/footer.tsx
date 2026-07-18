import NextLink from "next/link"
import { ComponentProps } from "react"

import { SocialLink } from "@/components/social-links"
import { classNames } from "@/lib/tw"

export function Footer({
  socialLinks,
  navLinks,
}: {
  socialLinks: Array<{ label: string; href: string; imageSrc: any }>
  navLinks: Array<{ label: string; href: string }>
}) {
  return (
    <footer className="pxcontent border-primary-500 border-t border-b-8 border-t-gray-100 py-6">
      <div className="mx-auto max-w-(--breakpoint-xl)">
        <div className="md:flex md:justify-between">
          <ul aria-label="Links zu Social-Media-Profilen" className="flex items-center space-x-4">
            {socialLinks.map((l, index) => (
              <li key={index}>
                <SocialLink {...l} className="group-hover:grayscale" />
              </li>
            ))}
          </ul>
          <div className="text-onbackground-700 pt-4 text-start md:pt-0 md:text-end">
            <span className="text-sm">© {new Date().getFullYear()} Fabian Rosenthal</span>
            <br />
            <span className="text-xs">
              {navLinks.map((l, index) => (
                <SecondaryLink key={index} href={l.href}>
                  {l.label}
                </SecondaryLink>
              ))}
            </span>
          </div>
        </div>
        <div className="pt-10 text-sm">
          Ich unterstütze{" "}
          <SecondaryLink href="https://www.greenpeace.de" target="_blank">
            Greenpeace
          </SecondaryLink>
          ,{" "}
          <SecondaryLink href="https://www.amnesty.de" target="_blank">
            Amnesty International
          </SecondaryLink>{" "}
          &{" "}
          <SecondaryLink href="https://planetwild.com" target="_blank">
            Planet Wild
          </SecondaryLink>{" "}
          – für Klima & Menschenrechte<span aria-hidden="true"> 🌍🌱❤️</span>
        </div>
      </div>
    </footer>
  )
}

const SecondaryLink = ({ className, ...props }: ComponentProps<typeof NextLink>) => {
  return <NextLink {...props} className={classNames("underline hover:no-underline", className ?? "")} />
}
