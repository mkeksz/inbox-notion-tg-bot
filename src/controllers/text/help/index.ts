import {TextContext} from 'typings/telegraf'

export default (ctx: TextContext) => {
  return ctx.replyWithHTML(ctx.locales.scenes.help, {disable_web_page_preview: true})
}
