import makeWASocket, { useMultiFileAuthState, DisconnectReason, jidNormalizedUser } from "@adiwajshing/baileys";
import fs from "fs/promises";
import path from "path";
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

    sock.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect } = update

      this.wc.send("connection", {
        name,
        qr: update.qr,
        conStatus: connection,
        data: sock.user
      })

      if(connection === 'close') {
          const status = (lastDisconnect.error as Boom)?.output?.statusCode;
          if(status !== DisconnectReason.loggedOut) {
            this.newClient(name) 
          } else {
            this.wc.send("client-removed", name)
            await fs.rm(path.join("sessions", name), { recursive: true, force: true })
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
  async logout(name: string) {
    const { sock } = Socket.clients[name]
    return await sock.logout()
  }
}

export default Socket;