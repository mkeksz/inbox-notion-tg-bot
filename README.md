# Запуск кода в Production
### Установка зависимостей
`npm install --production`
### Миграция базы данных
`npx prisma@^3.15.2 migrate deploy`
### Запуск приложения
`npm run start`

# Создание интеграции с Notion
Для работы бота нужно создать интеграцию с вашей базов в Notion.

# Установка для разработки
### Установка зависимостей
`npm install`
### Установка ts-node глобально для работы nodemon
`npm install -g ts-node`

# Переменные Environment
`TG_BOT_TOKEN` - API токен Telegram бота

`DATABASE_URL` - адрес базы данных PostgreSQL (postgresql://root:1234@localhost:5432/test?schema=public)
