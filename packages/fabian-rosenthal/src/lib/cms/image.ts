import { BlobNotFoundError, head, put } from "@vercel/blob"

const downloadImage = async (url: string, filename: string, lastEditedTime: Date) => {
  try {
    const meta = await head([process.env.BLOB_WORKAROUND_BASE_URL, filename].join("/"))
    // Avoid download the file again and again
    if (meta.uploadedAt >= lastEditedTime) {
      return meta.url
    }
  } catch (error) {
    if (error instanceof BlobNotFoundError) {
      console.debug(`${filename} not found`)
    } else {
      console.warn(`${filename}: ${error}`)
    }
  }

  const fetchResp = await fetch(url)
  const blob = await fetchResp.blob()

  const putResp = await put(filename, blob, {
    access: "public",
    addRandomSuffix: false,
  })
  console.debug(`downloaded image ${filename}`)
  return putResp.url
}

export const downloadImageToPublicDir = async (url: string, filename: string, lastEdited: Date) => {
  const fileUrl = new URL(url)
  const originalFilename = fileUrl.pathname.substring(fileUrl.pathname.lastIndexOf("/") + 1)
  const originalExtension = originalFilename.split(".").pop()
  const targetFilename = [
    process.env.NEXT_PUBLIC_VERCEL_ENV ?? "preview",
    "cms",
    `${filename}.${originalExtension}`,
  ].join("/")

  return await downloadImage(url, targetFilename, lastEdited)
}
