import {BaseContext} from 'typings/telegraf'
import {MiddlewareFn} from 'telegraf'
import KnownError from 'KnownError'

const middleware: MiddlewareFn<BaseContext> = async (ctx, next) => {
  if (!ctx.user.notion_api_token || !ctx.user.notion_database_id) throw new KnownError(ctx.locales.shared.error_api)
  return next()
}

export default middleware
