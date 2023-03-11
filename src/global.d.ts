declare namespace api {
  function createClient(name: string): Promise<string>
  function getProfileUrl(name: string, id: string): Promise<unknown>
  function checkOnWhatsApp(name: string, numbers: string[]): Promise<CheckedNumber[]>
  function onConnection(cb: (data: unknown) => void): void
}

type CheckedNumber = {
  exist: boolean
  number: string
}