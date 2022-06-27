import BaseService from '../BaseService'

export default class NotionPageService extends BaseService {
  public async create(notion_id: string, telegram_message_id: string, user_id: string) {
    return await this.database.notionPage.create({
      data: {user_id, telegram_message_id, notion_id}
    })
  }

  public async getByTelegramMessageId(telegram_message_id: string, user_id: string) {
    return await this.database.notionPage.findFirst({where: {telegram_message_id, user_id}})
  }
}
