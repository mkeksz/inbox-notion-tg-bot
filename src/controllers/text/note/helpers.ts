import {BaseContext, TextContext} from 'typings/telegraf'
import {APIErrorCode, APIResponseError} from '@notionhq/client'
import KnownError from 'KnownError'

export async function createNotionPage(ctx: BaseContext, title: string, text: string | null): Promise<string> {
  const hasChildren = !!text
  const page = await ctx.notion.pages.create({
    auth: String(ctx.user.notion_api_token),
    parent: {database_id: String(ctx.user.notion_database_id)},
    properties: {
      title: {title: [{text: {content: title}}]}
    },
    children: hasChildren ? [{
      object: 'block',
      type: 'paragraph',
      paragraph: {rich_text: [{type: 'text', text: {content: text}}]}
    }] : undefined
  })
  return page.id
}

export async function addBlockToNotionPage(ctx: TextContext, text: string): Promise<string> {
  const replyMessageID = String(ctx.message.reply_to_message?.message_id)
  const notionPage = await ctx.services.notionPage.getByTelegramMessageId(replyMessageID, ctx.user.telegram_id)
  if (!notionPage) throw new KnownError(ctx.locales.scenes.note.error_page_id)
  await ctx.notion.blocks.children.append({
    auth: String(ctx.user.notion_api_token),
    block_id: notionPage.notion_id,
    children: [{
      object: 'block',
      type: 'paragraph',
      paragraph: {rich_text: [{type: 'text', text: {content: text}}]}
    }]
  })
  return notionPage.notion_id
}

export function getErrorNotion(error: unknown, ctx: BaseContext) {
  if (!(error instanceof APIResponseError)) return error
  if (error.code === APIErrorCode.Unauthorized || error.code === APIErrorCode.ValidationError) {
    return new KnownError(ctx.locales.shared.error_api)
  }
  if (error.code === APIErrorCode.ObjectNotFound) return new KnownError(ctx.locales.shared.error_not_found)
  return error
}
