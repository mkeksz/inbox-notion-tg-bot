import {TextContext} from 'typings/telegraf'
import {Markup} from 'telegraf'

export default (ctx: TextContext) => {
  const languages = ctx.locales.scenes.language.buttons as {[key: string]: string}
  const buttons = Object.keys(languages).map(key => {
    return {text: String(languages[key]), callback_data: 'lang:' + key}
  })
  const inlineKeyboard = Markup.inlineKeyboard(buttons)
  return ctx.reply(ctx.locales.scenes.language.select, inlineKeyboard)
}
