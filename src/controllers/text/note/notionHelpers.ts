import {BaseContext, MessageContext} from 'typings/telegraf'
import {NotionTextEntity} from 'typings/notion'
import KnownError from 'KnownError'

export async function createNotionPage(ctx: BaseContext, title: string, content: NotionTextEntity[]): Promise<string> {
  const hasChildren = content.length > 0
  const page = await ctx.notion.pages.create({
    auth: String(ctx.user.notion_api_token),
    parent: {database_id: String(ctx.user.notion_database_id)},
    properties: {
      title: {title: [{text: {content: title}}]}
    },
    children: hasChildren ? [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {rich_text: content}
      }
    ] : undefined
  })
  return page.id
}

export async function addBlockToNotionPage(ctx: MessageContext, content: NotionTextEntity[]): Promise<string> {
  if (!('reply_to_message' in ctx.message)) throw new Error()
  const replyMessageID = String(ctx.message.reply_to_message?.message_id)
  const notionPage = await ctx.services.notionPage.getByTelegramMessageId(replyMessageID, ctx.user.telegram_id)
  if (!notionPage) throw new KnownError(ctx.locales.scenes.note.error_page_id)
  await ctx.notion.blocks.children.append({
    auth: String(ctx.user.notion_api_token),
    block_id: notionPage.notion_id,
    children: [{
      object: 'block',
      type: 'paragraph',
      paragraph: {rich_text: content}
    }]
  })
  return notionPage.notion_id
}
