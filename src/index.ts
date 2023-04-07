import { app, BrowserWindow, ipcMain, session } from 'electron';
import { lookpath } from "lookpath";
import ffmpegPath from "ffmpeg-static";
import fs from "fs/promises";
import path from "path";
import Socket from "../utils/socket"

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const fmPath = ffmpegPath.replace('app.asar', 'app.asar.unpacked').split('\\').slice(0, -1).join('\\');

lookpath("ffmpeg").then((res) => {
  if(!res) process.env.PATH = `${process.env.PATH};${fmPath}`
})

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 500,
    width: 800,
    minHeight: 500,
    minWidth: 800,
    autoHideMenuBar: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    icon: "../assets/icon.png"
  });

  const webContents = mainWindow.webContents;

  const sock = new Socket(webContents)

  // session.defaultSession.clearStorageData();

  webContents.executeJavaScript("localStorage.getItem('data');", true)
    .then((res) => {
      const data = JSON.parse(res);
      if (data?.client) {
        Object.keys(data.client.clients).forEach(key => {
          sock.newClient(key)
        });
      }
    })

  ipcMain.handle("sock:create-client", (_, name) => {
    sock.newClient(name)
  })
  ipcMain.handle("sock:logout-client", async (_, name) => {
    await sock.logout(name)
    await fs.rm(path.join(app.getPath("userData"), "sessions", name), { recursive: true, force: true } )
  })
  ipcMain.handle("sock:get-profileUrl", async (_, name, id) => {
    const url = await sock.getProfileUrl(name, id)
    return url;
  })
  ipcMain.handle("sock:get-groups", async (_, name) => {
    const metadata = await sock.getGroups(name)
    return metadata;
  })
  ipcMain.handle("sock:get-group", async (_, name, id) => {
    const metadata = await sock.getGroup(name, id)
    return metadata;
  })
  ipcMain.handle("sock:leave-group", async (_, name, id) => {
    await sock.leaveGroup(name, id)
  })
  ipcMain.handle("sock:check-numbers", async (_, name, numbers) => {
    const checked = await sock.checkOnWhatsApp(name, numbers)
    return checked;
  })
  ipcMain.handle("sock:send-message", async (_, name, message, to, media) => {
    await sock.sendMessage(name, message, to, media)
  })
  
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
