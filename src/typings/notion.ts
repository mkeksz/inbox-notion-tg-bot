export type NotionTextEntity = {
  text: {
    content: string,
    link?: {
      url: string
    } | null
  },
  type?: "text",
  annotations?: {
    bold?: boolean,
    italic?: boolean,
    strikethrough?: boolean,
    underline?: boolean,
    code?: boolean,
    color?: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red" | "gray_background" | "brown_background" | "orange_background" | "yellow_background" | "green_background" | "blue_background" | "purple_background" | "pink_background" | "red_background"
  }
}
