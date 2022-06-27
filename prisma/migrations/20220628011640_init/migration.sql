-- CreateTable
CREATE TABLE "User" (
    "telegram_id" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT E'en',
    "notion_database_id" TEXT,
    "notion_api_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("telegram_id")
);

-- CreateTable
CREATE TABLE "NotionPage" (
    "id" TEXT NOT NULL,
    "telegram_message_id" TEXT NOT NULL,
    "notion_id" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "NotionPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegram_id_key" ON "User"("telegram_id");

-- CreateIndex
CREATE UNIQUE INDEX "NotionPage_id_key" ON "NotionPage"("id");

-- AddForeignKey
ALTER TABLE "NotionPage" ADD CONSTRAINT "NotionPage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("telegram_id") ON DELETE SET NULL ON UPDATE CASCADE;
