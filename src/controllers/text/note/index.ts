import {getErrorNotion, getPhotoURL, isPhoto as _isPhoto} from './helpers'
import {addBlockToNotionPage, createNotionPage} from './notionHelpers'
import {MessageContext} from 'typings/telegraf'
import {downloadFile} from 'utils/file'
import KnownError from 'KnownError'
import NoteData from './NoteData'

export default async (ctx: MessageContext) => {
  await ctx.replyWithChatAction('typing')
  const isPhoto = _isPhoto(ctx)
  if (isPhoto) {
    const fileURL = await getPhotoURL(ctx)
    try {
      const filename = await downloadFile(fileURL)
    } catch {
      throw new KnownError(ctx.locales.scenes.note.error_photo)
    }
  }

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
