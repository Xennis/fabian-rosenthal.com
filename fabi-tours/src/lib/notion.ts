import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export const propsFirstPlainText = (properties: PageObjectResponse["properties"], name: string) => {
  const prop = properties[name]
  if (prop?.type === "rich_text" && prop.rich_text.length > 0) {
    return prop.rich_text[0].plain_text
  }
  if (prop?.type === "title" && prop.title.length > 0) {
    return prop.title[0].plain_text
  }
  return null
}

export const propsMultiSelect = (properties: PageObjectResponse["properties"], name: string) => {
  const prop = properties[name]
  if (prop?.type === "multi_select") {
    return prop.multi_select.map((ms) => ms.name)
  }
  return null
}

export const propsUrl = (properties: PageObjectResponse["properties"], name: string) => {
  const prop = properties[name]
  if (prop?.type === "url") {
    return prop.url
  }
  return null
}
