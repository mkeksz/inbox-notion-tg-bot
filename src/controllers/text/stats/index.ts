import {TextContext} from 'typings/telegraf'

export default async (ctx: TextContext) => {
  const quantityUsers = String(await ctx.services.user.countUsers())
  const quantityPages = String(await ctx.services.notionPage.countPages())

  const text = ctx.locales.scenes.stats
    .replace('{users}', quantityUsers)
    .replace('{notes}', quantityPages)
  return ctx.replyWithHTML(text)
}
