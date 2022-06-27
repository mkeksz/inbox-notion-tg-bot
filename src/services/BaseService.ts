import {PrismaClient} from '@prisma/client'

export default class BaseService {
  protected readonly database: PrismaClient
  public constructor(database: PrismaClient) {
    this.database = database
  }
}
