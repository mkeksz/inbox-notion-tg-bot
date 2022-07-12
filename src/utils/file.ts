import download from 'download'
import config from 'config'
import * as fs from 'fs'
import cuid from 'cuid'

export async function downloadFile(fileURL: URL): Promise<string> {
  const ext = fileURL.pathname.split('.').pop()
  const newFilename = `${cuid()}.${ext}`
  const dest = `${config.dirs.root}../uploads`
  const options = {filename: newFilename}
  await download(fileURL.toString(), dest, options)
  return newFilename
}

export function clearUploads(filename?: string): void {
  if (filename) return fs.unlinkSync(`${config.dirs.root}../uploads/${filename}`)
  const dest = `${config.dirs.root}../uploads`
  fs.rmdirSync(dest, {recursive: true})
}
