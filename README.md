# Inbox Notion Bot 
Бот для быстрой отправки заметок в ящик входящих Notion

Ссылка на самого Telegram-бота: https://t.me/inbox_notion_robot

## Запуск кода в Production
### Установка зависимостей
`npm install --omit=dev`
### Миграция базы данных
`npx prisma@^3.15.2 migrate deploy`
### Запуск приложения
`npm run start`

## Создание интеграции с Notion
Для работы бота нужно создать интеграцию с вашей базой в Notion.

https://www.notion.so/my-integrations

https://developers.notion.com/docs

## Для разработки
### Установка зависимостей
`npm install`
### Установка ts-node глобально для работы nodemon
`npm install -g ts-node`
### Установка схемы БД
`prisma db push`
### Запуск в dev режиме
`npm run dev`

## Переменные Environment
`TG_BOT_TOKEN` - API токен Telegram бота

`DATABASE_URL` - адрес базы данных PostgreSQL (postgresql://root:1234@localhost:5432/test?schema=public)

`WEBHOOK` - адрес вебхука

`PORT` - порт для прослушивания при вебхуке
