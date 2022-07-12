import {BaseContext, MessageContext, PhotoContext} from 'typings/telegraf'
import {APIErrorCode, APIResponseError} from '@notionhq/client'
import KnownError from 'KnownError'

export function getErrorNotion(error: unknown, ctx: BaseContext): KnownError | unknown {
  if (!(error instanceof APIResponseError)) return error
  if (error.code === APIErrorCode.Unauthorized || error.code === APIErrorCode.ValidationError) {
    return new KnownError(ctx.locales.shared.error_api)
  }
  if (error.code === APIErrorCode.ObjectNotFound) return new KnownError(ctx.locales.shared.error_not_found)
  return error
}

export function isPhoto(ctx: MessageContext): ctx is PhotoContext {
  return 'photo' in ctx.message
}

export async function getPhotoURL(ctx: PhotoContext): Promise<URL> {
  const photo = ctx.message.photo[ctx.message.photo.length - 1]
  if (!photo) throw new KnownError(ctx.locales.scenes.note.error_photo)
  const fileId = photo.file_id
  const file = await ctx.telegram.getFile(fileId)
  return await ctx.telegram.getFileLink(file)
}
