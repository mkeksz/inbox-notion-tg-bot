import {APIErrorCode, APIResponseError} from '@notionhq/client'
import {BaseContext} from 'typings/telegraf'
import KnownError from 'KnownError'

export function getErrorNotion(error: unknown, ctx: BaseContext) {
  if (!(error instanceof APIResponseError)) return error
  if (error.code === APIErrorCode.Unauthorized || error.code === APIErrorCode.ValidationError) {
    return new KnownError(ctx.locales.shared.error_api)
  }
  if (error.code === APIErrorCode.ObjectNotFound) return new KnownError(ctx.locales.shared.error_not_found)
  return error
}
