import {TextContext} from 'typings/telegraf'
import KnownError from 'KnownError'

export default async (ctx: TextContext) => {
  const regEx = /^\/notion_token (\S+)$/
  const text = ctx.message.text
  const invalidCommandText = ctx.locales.scenes.notion_token.invalid_command

  if (!regEx.test(text)) throw new KnownError(invalidCommandText)

  const match = text.match(regEx)
  if (!match || !match[1]) throw new KnownError(invalidCommandText)

  const token = match[1]
  // try {
  // } catch (error) {
  //   if (!(error instanceof APIResponseError) || error.code !== APIErrorCode.Unauthorized) throw error
  //   throw new KnownError(ctx.locales.scenes.notion_token.invalid_token)
  // }
  const data = {notion_api_token: token}
  await ctx.services.user.updateUser(ctx.user.telegram_id, data)

  return ctx.reply(ctx.locales.scenes.notion_token.success)
}
