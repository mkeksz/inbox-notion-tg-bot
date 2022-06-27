import {BaseContext} from 'typings/telegraf'
import {MiddlewareFn} from 'telegraf'

const middleware: MiddlewareFn<BaseContext> = async (ctx, next) => {
  if (!ctx.from) return
  const userID = ctx.from.id.toString()
  let user = await ctx.services.user.getUserByTelegramId(userID)
  if (!user) {
    const language = ctx.from.language_code
    user = await ctx.services.user.createUser(userID, language)
  }
  ctx.user = user
  return next()
}

export default middleware
