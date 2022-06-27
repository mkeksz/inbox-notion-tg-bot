import {TextContext} from 'typings/telegraf'

export default (ctx: TextContext) => {
  return ctx.replyWithHTML(ctx.locales.scenes.start, {
    reply_markup: {remove_keyboard: true},
    disable_web_page_preview: true
  })
}
