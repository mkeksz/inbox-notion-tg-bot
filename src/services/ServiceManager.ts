import NotionPageService from 'services/NotionPage'
import {PrismaClient} from '@prisma/client'
import UserService from 'services/User'

export default class ServiceManager {
  public readonly notionPage: NotionPageService
  public readonly user: UserService

  public constructor(database: PrismaClient) {
    this.user = new UserService(database)
    this.notionPage = new NotionPageService(database)
  }
}
