import {TextContext} from 'typings/telegraf'
import KnownError from 'KnownError'

export default async (ctx: TextContext) => {
  const regEx = /^\/notion_database (\S+)$/
  const text = ctx.message.text
  const invalidCommandText = ctx.locales.scenes.notion_database.invalid_command

  if (!regEx.test(text)) throw new KnownError(invalidCommandText)

  const match = text.match(regEx)
  if (!match || !match[1]) throw new KnownError(invalidCommandText)

  const databaseID = match[1]

  const data = {notion_database_id: databaseID}
  await ctx.services.user.updateUser(ctx.user.telegram_id, data)

  return ctx.reply(ctx.locales.scenes.notion_database.success)
}
