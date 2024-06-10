import path from "node:path"
import { statSync, writeFileSync } from "node:fs"

import nextConfig from "../../../next.config.mjs"

const publicDir = "public"

const downloadImage = async (url: string, filename: string, lastEditedTime: Date) => {
  let savedLastEditedTime: Date | null = null
  try {
    const stat = statSync(filename)
    savedLastEditedTime = stat.mtime
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      console.debug(`${filename} not found`)
    } else {
      console.warn(`${filename}: ${error}`)
    }
  }
  // Avoid download the file again and again
  if (savedLastEditedTime === null || lastEditedTime > savedLastEditedTime) {
    const resp = await fetch(url)
    const blob = await resp.blob()
    writeFileSync(filename, new DataView(await blob.arrayBuffer()))
    console.debug(`downloaded image ${filename}`)
  }
}

export const downloadImageToPublicDir = async (url: string, filename: string, lastEdited: Date) => {
  const fileUrl = new URL(url)
  const originalFilename = fileUrl.pathname.substring(fileUrl.pathname.lastIndexOf("/") + 1)
  const originalExtension = originalFilename.split(".").pop()
  const targetFilename = path.join(publicDir, "cms", `${filename}.${originalExtension}`)

  await downloadImage(url, targetFilename, lastEdited)
  return targetFilename.replace(publicDir, nextConfig.basePath ?? "")
}
