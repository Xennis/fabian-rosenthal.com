import { downloadImage } from "@react-notion-cms/fetch"
import nextConfig from "../../../next.config.mjs"

export const downloadImageToPublicDir = async (url: string, meta: { blockId: string; lastEditedTime: Date }) => {
  const localImage = await downloadImage("public/cms", url, meta)
  return localImage.replace("public", nextConfig.basePath ?? "")
}
