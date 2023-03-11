import { Client } from "@/redux/slices/clientSlice"
import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('api', {
  createClient: (name: string) => ipcRenderer.invoke("create-client", name),
  getProfileUrl: (name: string, id: string) => ipcRenderer.invoke("get-profileUrl", name, id),
  checkOnWhatsApp: (name: string, numbers: string[]) => ipcRenderer.invoke("check-numbers", name, numbers),
  onConnection: (cb: (data: Client) => void) => ipcRenderer.on("connection", (_, data) => cb(data))
})

