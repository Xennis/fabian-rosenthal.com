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
  dictionary,
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
  dictionary: { consentButtonLabel: string }
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
    return <div className="h-[500px] w-full animate-pulse rounded bg-gray-100"></div>
  }

  return (
    <div className="flex h-[500px] w-full rounded bg-green-200">
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
          className="rounded bg-slate-900 px-3 py-1.5 font-semibold text-white shadow"
          onClick={onClick}
        >
          {dictionary.consentButtonLabel}
        </button>
      </div>
    </div>
  )
}
