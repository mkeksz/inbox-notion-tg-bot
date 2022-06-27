import {Client, LogLevel} from '@notionhq/client'
import config from 'config'

export default new Client({logLevel: config.dev ? LogLevel.DEBUG : LogLevel.ERROR})
