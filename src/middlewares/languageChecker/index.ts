import {BaseContext} from 'typings/telegraf'
import {Locales} from 'typings/locales'
import {MiddlewareFn} from 'telegraf'
import KnownError from 'KnownError'

const middleware = (locales: Locales): MiddlewareFn<BaseContext> => {
  return (ctx, next) => {
    const locale = locales[ctx.user.language] ?? locales['en']
    if (!locale) throw new KnownError('The language file is not found!\nContact the administrator.')
    ctx.locales = locale
    return next()
  }
}

export default middleware
