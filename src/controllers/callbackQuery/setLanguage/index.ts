import {CallbackQueryRegExContext} from 'typings/telegraf'

export default async (ctx: CallbackQueryRegExContext) => {
  const language = String(ctx.match[1])
  const data = {language}
  await ctx.services.user.updateUser(ctx.user.telegram_id, data)
  await ctx.deleteMessage()
  return ctx.reply(ctx.locales.scenes.language.success)
}
