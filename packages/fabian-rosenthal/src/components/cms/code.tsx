"use client"

import { useEffect, useRef } from "react"
import { highlightElement } from "prismjs"

import "prismjs/components/prism-python.min.js"
import "prismjs/components/prism-typescript.min.js"
import "prismjs/themes/prism-okaidia.min.css"

export const Code = ({ ...props }: React.ComponentPropsWithoutRef<"code">) => {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (ref.current) {
      try {
        highlightElement(ref.current)
      } catch (err) {
        console.warn("prismjs highlight error", err)
      }
    }
  }, [ref])

  return (
    <code ref={ref} {...props}>
      {props.children}
    </code>
  )
}
