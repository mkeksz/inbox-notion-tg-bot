import {Context, NarrowedContext, Types} from 'telegraf'
import ServiceManager from 'services/ServiceManager'
import {Client} from '@notionhq/client'
import locales from 'locales/en.json'
import {User} from '@prisma/client'

export interface BaseContext extends Context {
  notion: Client,
  locales: typeof locales,
  services: ServiceManager,
  user: User
}

export type MessageContext = NarrowedContext<BaseContext, Types.MountMap['message']>
export type TextContext = NarrowedContext<BaseContext, Types.MountMap['text']>
export type TextRegExContext = NarrowedContext<BaseContext & {match: RegExpExecArray}, Types.MountMap['text']>
export type JoinRequestContext = NarrowedContext<BaseContext, Types.MountMap['chat_join_request']>
export type CallbackQueryContext = NarrowedContext<BaseContext, Types.MountMap['callback_query']>
export type CallbackQueryRegExContext = NarrowedContext<BaseContext & {match: RegExpExecArray}, Types.MountMap['callback_query']>
