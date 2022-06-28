import BaseService from '../BaseService'
import {User} from '@prisma/client'

export default class UserService extends BaseService {
  public async createUser(telegram_id: string, language: string = 'en'): Promise<User> {
    return await this.database.user.create({data: {telegram_id, language}})
  }

  public async getUserByTelegramId(telegram_id: string): Promise<User | null> {
    return await this.database.user.findUnique({where: {telegram_id}})
  }

  public async updateUser(telegram_id: string, data: UserData): Promise<User> {
    return await this.database.user.update({where: {telegram_id}, data})
  }

  public async countUsers(): Promise<number> {
    return await this.database.user.count()
  }
}

interface UserData {
  language?: string,
  notion_database_id?: string,
  notion_api_token?: string
}
