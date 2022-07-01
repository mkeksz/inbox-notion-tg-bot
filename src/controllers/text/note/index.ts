import {addBlockToNotionPage, createNotionPage} from './notionHelpers'
import {MessageContext} from 'typings/telegraf'
import {getErrorNotion} from './helpers'
import NoteData from './NoteData'

export default async (ctx: MessageContext) => {
  await ctx.replyWithChatAction('typing')

  const noteData = new NoteData(ctx)

  let pageID: string
  try {
    if (noteData.isAddition) pageID = await addBlockToNotionPage(ctx, noteData.content)
    else pageID = await createNotionPage(ctx, noteData.title, noteData.content)
  } catch (error) {
    throw getErrorNotion(error, ctx)
  }

  const messageID = ctx.message.message_id.toString()
  await ctx.services.notionPage.create(pageID, messageID, ctx.user.telegram_id)

  const replyText = noteData.isAddition ? ctx.locales.scenes.note.success_update : ctx.locales.scenes.note.success
  return ctx.reply(replyText)
}
