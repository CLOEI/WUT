declare namespace api {
  function createClient(name: string): Promise<string>
  function getConUserData(name: string): Promise<unknown>
  function onConnection(cb: (data: unknown) => void): void
}