export default {
  telegram: {
    bot: {
      token: String(process.env['TG_BOT_TOKEN'])
    }
  },
  notion: {
    token: String(process.env['NOTION_TOKEN']),
    databaseID: String(process.env['NOTION_DATABASE_ID']),
  },
  dev: process.env['NODE_ENV'] === 'development',
  dirs: {
    root: __dirname + '/',
    locales: __dirname + '/locales',
  },
  webhook: process.env['WEBHOOK'],
  port: Number(process.env['PORT']) || 8000,
}
