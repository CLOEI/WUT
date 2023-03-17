import makeWASocket, { useMultiFileAuthState, DisconnectReason, jidNormalizedUser } from "@adiwajshing/baileys";
import fs from "fs/promises";
import path from "path";
import { lookup } from "mime-types"
import { Boom } from '@hapi/boom/lib'
import { pino } from 'pino'

type Clients = {
  [x: string] : ReturnType<typeof makeWASocket>;
}

type Mime = "image"|"video"|"document"

class Socket {
  name: string;
  wc: Electron.WebContents;
  static clients: Clients = {}

  constructor(e: Electron.WebContents) {
    this.wc = e;
  }

  async newClient(name: string) {
    const { state, saveCreds } = await useMultiFileAuthState(`sessions/${name}`)
    const sock = makeWASocket({
      auth: state,
      browser: ["WUT", "Chrome", "1.0.0"],
      logger: pino({ level: process.env.NODE_ENV === "production" ? "silent": "trace" }),
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
        Socket.clients[name] = sock
      }
    })

    sock.ev.on('creds.update', saveCreds)
  }

  async getProfileUrl(name: string, id: string) {
    const sock = Socket.clients[name]
    return await sock.profilePictureUrl(jidNormalizedUser(id))
  }

  async checkOnWhatsApp(name: string, numbers: string[]) {
    const sock = Socket.clients[name]

    return await Promise.all(numbers.map((number) => {
      return new Promise((resolve) => {
        sock.onWhatsApp(number.replace(/\D/g, ""))
          .then(res => {
            const jid = res[0]?.jid.split("@")[0] || number
            return res[0] ? resolve({ number: jid, exist: true }) : resolve({ number: jid, exist: false })
          })
      })
    }))
  }

  async logout(name: string) {
    const sock = Socket.clients[name]
    return await sock.logout()
  }

  async sendMessage(name: string, message: string, to: string, media?: string) {
    const sock = Socket.clients[name]

    if ( media ) {
      const mimetype = lookup(media) as string
      const type: Mime = mimetype.split('/')[0] as Mime

      // @ts-ignore: Type only resolve to Mimetype except sticker.
      await sock.sendMessage(to, { [type]: await fs.readFile(media), caption: message, mimetype })
    } else {
      await sock.sendMessage(to, { text: message })
    }
  }
}

export default Socket;