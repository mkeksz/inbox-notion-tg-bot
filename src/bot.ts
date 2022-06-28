import languageChecker from 'middlewares/languageChecker'
import ServiceManager from 'services/ServiceManager'
import setLanguage from 'callbackQuery/setLanguage'
import errorHandler from 'middlewares/errorHandler'
import {getLocalesFromFiles} from 'utils/locales'
import userChecker from 'middlewares/userChecker'
import notionDatabase from 'text/notionDatabase'
import {BaseContext} from 'typings/telegraf'
import {PrismaClient} from '@prisma/client'
import notionToken from 'text/notionToken'
import language from 'text/language'
import {Telegraf} from 'telegraf'
import stats from 'text/stats'
import start from 'text/start'
import help from 'text/help'
import note from 'text/note'
import config from 'config'
import notion from 'notion'

const locales = getLocalesFromFiles()
const database = new PrismaClient()

const bot = new Telegraf<BaseContext>(config.telegram.bot.token)

bot.context.notion = notion
bot.context.services = new ServiceManager(database)

bot.use(errorHandler)
bot.use(userChecker)
bot.use(languageChecker(locales))

bot.start(start)
bot.help(help)
bot.command('language', language)
bot.command('notion_token', notionToken)
bot.command('notion_database', notionDatabase)
bot.command('stats', stats)
bot.action(/^lang:(\w\w)$/, setLanguage)
bot.on('text', note)

export default bot
