import { Client } from "@/redux/slices/clientSlice"
import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('api', {
  createClient: (name: string) => ipcRenderer.invoke("sock:create-client", name),
  logoutClient: (name: string) => ipcRenderer.invoke("sock:logout-client", name),
  getProfileUrl: (name: string, id: string) => ipcRenderer.invoke("sock:get-profileUrl", name, id),
  getGroups: (name: string) => ipcRenderer.invoke("sock:get-groups", name),
  getGroup: (name: string, id: string) => ipcRenderer.invoke("sock:get-group", name, id),
  leaveGroup: (name: string, id: string) => ipcRenderer.invoke("sock:leave-group", name, id),
  checkOnWhatsApp: (name: string, numbers: string[]) => ipcRenderer.invoke("sock:check-numbers", name, numbers),
  sendMessage: (name: string, message: string, to: string, media: string) => ipcRenderer.invoke("sock:send-message", name, message, to, media),
  onConnection: (cb: (data: Client) => void) => ipcRenderer.on("sock:connection", (_, data) => cb(data)),
  onRemoved: (cb: (name: string) => void) => ipcRenderer.on("sock:client-removed", (_, name) => cb(name))
})

