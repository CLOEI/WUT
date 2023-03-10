import { Client } from "@/redux/slices/clientSlice"
import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('api', {
  createClient: (name: string) => ipcRenderer.invoke("c-client", name),
  onConnection: (cb: (data: Client) => void) => ipcRenderer.on("connection", (_, data) => cb(data))
})

