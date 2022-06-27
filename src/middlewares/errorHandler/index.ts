import {BaseContext} from 'typings/telegraf'
import {MiddlewareFn} from 'telegraf'
import KnownError from 'KnownError'

const middleware: MiddlewareFn<BaseContext> = async (ctx, next) => {
  try {
    return await next()
  } catch (error) {
    let message = '<b>[ERROR]</b>\n'

    if (error instanceof KnownError && error.known) {
      if (error.show) message += error.message
      else message += 'An error has occurred! Try again.'
    } else {
      console.error(error)
      message += 'An unknown error has occurred!\nContact the administrator.'
    }

    return ctx.replyWithHTML(message)
  }
}

export default middleware
