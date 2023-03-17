import { Client } from "@/redux/slices/clientSlice"
import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('api', {
  createClient: (name: string) => ipcRenderer.invoke("create-client", name),
  logoutClient: (name: string) => ipcRenderer.invoke("logout-client", name),
  getProfileUrl: (name: string, id: string) => ipcRenderer.invoke("get-profileUrl", name, id),
  checkOnWhatsApp: (name: string, numbers: string[]) => ipcRenderer.invoke("check-numbers", name, numbers),
  sendMessage: (name: string, message: string, to: string, media: string) => ipcRenderer.invoke("send-message", name, message, to, media),
  onConnection: (cb: (data: Client) => void) => ipcRenderer.on("connection", (_, data) => cb(data)),
  onRemoved: (cb: (name: string) => void) => ipcRenderer.on("client-removed", (_, name) => cb(name))
})

