import NextLink from "next/link"

export const Link = (props: React.ComponentPropsWithoutRef<typeof NextLink>) => {
  return (
    <NextLink
      className="font-semibold underline decoration-primary-500 decoration-2 underline-offset-2 hover:no-underline"
      {...props}
    >
      {props.children}
    </NextLink>
  )
}
