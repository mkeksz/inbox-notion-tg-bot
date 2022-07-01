import {MessageContext} from 'typings/telegraf'
import {NotionTextEntity} from 'typings/notion'
import Typegram from 'typegram'

export default class NoteData {
  public readonly title: string
  public readonly isAddition: boolean
  public readonly content: NotionTextEntity[]
  private readonly ctx: MessageContext
  private readonly messageText: string
  private readonly messageEntities: Typegram.MessageEntity[]

  public constructor(ctx: MessageContext) {
    this.ctx = ctx
    this.isAddition = 'reply_to_message' in ctx.message && !!ctx.message.reply_to_message && ctx.message.from.id !== ctx.botInfo.id
    this.content = []

    if ('caption' in ctx.message) this.messageText = ctx.message.caption ?? ''
    else if ('text' in ctx.message) this.messageText = ctx.message.text
    else this.messageText = ''

    if ('caption_entities' in ctx.message) this.messageEntities = ctx.message.caption_entities ?? []
    else if ('entities' in ctx.message) this.messageEntities = ctx.message.entities ?? []
    else this.messageEntities = []

    this.title = String(this.messageText.split('\n')[0])

    if (this.title.length > 120) this.title = this.title.slice(0, 120).trim() + '...'
    this.generateContent()
    if (this.isOnlyURL()) this.title = this.ctx.locales.notion.default_link
  }

  private isOnlyURL(): boolean {
    const onlyOneContent = this.content.length === 1
    const isURLContent = !!this.content[0]?.text.link
    return onlyOneContent && isURLContent
  }

  private generateContent(): void {
    const tgEntities = filterTgEntities(this.messageEntities)
    const tgText = this.messageText

    if (!tgEntities.length) {
      if (this.messageText === this.title) return
      this.content.push(getNotionTextEntity(this.messageText))
      return
    }

    let prevOffset = 0
    let prevLength = 0
    tgEntities.forEach((tgEntity, i) => {
      if (tgEntity.offset === prevOffset + prevLength) {
        prevLength = tgEntity.length
        prevOffset = tgEntity.offset
        this.content.push(convertTgEntityToNotionEntity(tgEntity, tgText))
        return
      }

      const text = tgText.slice(prevOffset + prevLength, tgEntity.offset)
      this.content.push(getNotionTextEntity(text))

      prevLength = tgEntity.length
      prevOffset = tgEntity.offset
      this.content.push(convertTgEntityToNotionEntity(tgEntity, tgText))

      if (i === tgEntities.length - 1 && tgText.length > tgEntity.offset + tgEntity.length) {
        const text = tgText.slice(tgEntity.offset + tgEntity.length)
        this.content.push(getNotionTextEntity(text))
      }
    })
  }
}

function filterTgEntities(tgEntities: Typegram.MessageEntity[]): Typegram.MessageEntity[] {
  const validTypeEntities = ['text_link', 'url']
  return tgEntities.filter(tgEntity => validTypeEntities.includes(tgEntity.type))
}

function convertTgEntityToNotionEntity(tgEntity: Typegram.MessageEntity, tgText: string): NotionTextEntity {
  const url = getURLFromTgEntity(tgEntity, tgText)
  const text = tgText.slice(tgEntity.offset, tgEntity.offset + tgEntity.length)
  return getNotionTextEntity(text, url)
}

function getNotionTextEntity(content: string, url?: string): NotionTextEntity {
  const link = url ? {url} : undefined
  const text = {content, link}
  return {type: 'text', text}
}

function getURLFromTgEntity(tgEntity: Typegram.MessageEntity, tgText: string): string | undefined {
  if (tgEntity.type === 'text_link') return tgEntity.url
  if (tgEntity.type === 'url') return tgText.slice(tgEntity.offset, tgEntity.offset + tgEntity.length)
  return undefined
}
