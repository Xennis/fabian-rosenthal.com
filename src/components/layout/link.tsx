import NextLink from "next/link"

export const Link = (props: React.ComponentPropsWithoutRef<typeof NextLink>) => {
  return (
    <NextLink
      className="decoration-primary-500 font-semibold underline decoration-2 underline-offset-2 hover:no-underline"
      {...props}
    >
      {props.children}
    </NextLink>
  )
}
