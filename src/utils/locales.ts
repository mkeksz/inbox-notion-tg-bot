import {Locales} from 'typings/locales'
import locale from 'locales/en.json'
import config from 'config'
import fs from 'fs'

export function getLocalesFromFiles(): Locales {
  const files = fs.readdirSync(config.dirs.locales)
  const locales: Locales = {}

  for (const file of files) {
    const localeName = file.replace('.json', '')
    const localeFile = fs.readFileSync(`${config.dirs.locales}/${file}`, 'utf8')
    locales[localeName] = JSON.parse(localeFile) as typeof locale
  }

  return locales
}
