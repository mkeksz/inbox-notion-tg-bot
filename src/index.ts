import config from 'config'
import bot from 'bot'

const webhook = config.webhook ? {domain: config.webhook, port: config.port} : undefined

if (webhook) {
  console.info('Webhook on', config.webhook)
  console.info('The bot is listening a port', config.port)
}

bot.launch({webhook}).then(onLaunch).catch(onError)

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))


function onLaunch() {
  console.info('The bot is running!')
}

function onError(error: unknown) {
  console.error(error)
}
