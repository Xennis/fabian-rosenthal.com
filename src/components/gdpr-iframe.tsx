"use client"

import { useEffect, useState } from "react"
import NextLink from "next/link"

const storageGetItem = (key: string) => {
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.warn(error)
    return null
  }
}

const storageSetItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.warn(error)
  }
}

export function GdprIframe({
  config,
  children,
}: {
  config: {
    storageKey: string
    firstLine: string
    secondLine: string
    gdprLinkPrefix: string
    gdprLinkLabel: string
    gdprLinkHref: string
  }
  children: React.ReactNode
}) {
  const [enabled, setEnabled] = useState<"loading" | false | true>("loading")

  useEffect(() => {
    setEnabled(!!storageGetItem(config.storageKey))
  }, [setEnabled, config.storageKey])

  const onClick = () => {
    storageSetItem(config.storageKey, "true")
    setEnabled(true)
  }

  if (enabled === true) {
    return <div className="min-h-[500px]">{children}</div>
  }
  if (enabled === "loading") {
    return <div className="h-[500px] w-full animate-pulse rounded-sm bg-gray-100"></div>
  }

  return (
    <div className="flex h-[500px] w-full rounded-sm bg-green-200">
      <div className="m-auto p-4">
        <p className="pb-4">
          {config.firstLine}
          <br />
          {config.secondLine}
          <br />
          <br />
          {`${config.gdprLinkPrefix} `}
          <NextLink href={config.gdprLinkHref} target="_blank">
            {config.gdprLinkLabel}
          </NextLink>
          .
        </p>
        <button
          type="button"
          className="bg-onbackground-900 rounded-sm px-3 py-1.5 font-semibold text-white shadow-sm"
          onClick={onClick}
        >
          Load external content
        </button>
      </div>
    </div>
  )
}
