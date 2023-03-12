import makeWASocket, { useMultiFileAuthState, DisconnectReason, jidNormalizedUser } from "@adiwajshing/baileys";
import { Boom } from '@hapi/boom/lib'
import { pino } from 'pino'

type Clients = {
  [x: string] : {
    sock: ReturnType<typeof makeWASocket>;
  }
}

class Socket {
  name: string;
  wc: Electron.WebContents;
  static clients: Clients = {}

  constructor(e: Electron.WebContents) {
    this.wc = e;
  }

  async newClient(name: string) {
    const logger = pino()
    logger.level = "silent"

    const { state, saveCreds } = await useMultiFileAuthState(`sessions/${name}`)
    const sock = makeWASocket({
      auth: state,
      browser: ["WUT", "Chrome", "1.0.0"],
      logger
    });

    sock.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect } = update

      this.wc.send("connection", {
        name,
        qr: update.qr,
        conStatus: update.connection,
        data: sock.user
      })

      if(connection === 'close') {
          const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
          if(shouldReconnect) {
            this.newClient(name)
          }
      } else if(connection === 'open') {
        Socket.clients[name] = {
          sock
        }
      }
    })

    sock.ev.on('creds.update', saveCreds)
  }

  async getProfileUrl(name: string, id: string) {
    const { sock } = Socket.clients[name]
    return await sock.profilePictureUrl(jidNormalizedUser(id))
  }

  async checkOnWhatsApp(name: string, numbers: string[]) {
    const { sock } = Socket.clients[name]

    return await Promise.all(numbers.map((number) => {
      return new Promise((resolve) => {
        sock.onWhatsApp(number)
          .then(res => res[0] ? resolve({ number, exist: true }) : resolve({ number, exist: false }))
      })
    }))
  }
}

export default Socket;