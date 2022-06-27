export default class KnownError extends Error {
  public readonly known: boolean
  public readonly show: boolean

  public constructor(message: string, show = true) {
    super(message)
    this.known = true
    this.show = show
  }
}
