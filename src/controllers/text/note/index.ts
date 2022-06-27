import {getErrorNotion, createNotionPage, addBlockToNotionPage} from 'text/note/helpers'
import {TextContext} from 'typings/telegraf'
import KnownError from 'KnownError'

export default async (ctx: TextContext) => {
  const lines = ctx.message.text.split('\n')
  const title = String(lines[0]).trim()
  const text = lines.length > 0 ? lines.slice(1).join('\n').trim() : null

  await ctx.replyWithChatAction('typing')

  if (!ctx.user.notion_api_token || !ctx.user.notion_database_id) throw new KnownError(ctx.locales.shared.error_api)

  const isUpdate = !!ctx.message.reply_to_message

  let pageID: string
  try {
    if (isUpdate) pageID = await addBlockToNotionPage(ctx, ctx.message.text)
    else pageID = await createNotionPage(ctx, title, text)
  } catch (error) {throw getErrorNotion(error, ctx)}

  const messageID = ctx.message.message_id.toString()
  await ctx.services.notionPage.create(pageID, messageID, ctx.user.telegram_id)

  const replyText = isUpdate ? ctx.locales.scenes.note.success_update : ctx.locales.scenes.note.success
  return ctx.reply(replyText)
}
