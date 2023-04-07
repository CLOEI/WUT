type GroupMetadata = import('@adiwajshing/baileys').GroupMetadata

declare namespace api {
  function createClient(name: string): Promise<void>
  function logoutClient(name: string): Promise<void>
  function getProfileUrl(name: string, id: string): Promise<string>
  function getGroups(name: string): Promise<{[_: string]: GroupMetadata}>
  function getGroup(name: string, id: string): Promise<GroupMetadata>
  function leaveGroup(name: string, id: string): Promise<void>
  function checkOnWhatsApp(name: string, numbers: string[]): Promise<CheckedNumber[]>
  function sendMessage(name: string, message: string, to: string, media: string): Promise<void>
  function onConnection(cb: (data: unknown) => void): void
  function onRemoved(cb: (name: string) => void): void
}

type CheckedNumber = {
  exist: boolean
  number: string
}