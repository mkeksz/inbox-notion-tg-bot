-- CreateTable
CREATE TABLE "User" (
    "telegram_id" TEXT NOT NULL PRIMARY KEY,
    "language" TEXT NOT NULL DEFAULT 'en',
    "notion_database_id" TEXT,
    "notion_api_token" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "NotionPage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telegram_message_id" TEXT NOT NULL,
    "notion_id" TEXT NOT NULL,
    "user_id" TEXT,
    CONSTRAINT "NotionPage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("telegram_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegram_id_key" ON "User"("telegram_id");

-- CreateIndex
CREATE UNIQUE INDEX "NotionPage_id_key" ON "NotionPage"("id");
