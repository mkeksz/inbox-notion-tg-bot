import bot from 'bot'

bot.launch()
  .then(_ => console.info('The bot is running!'))
  .catch(console.error)

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
