import { app, BrowserWindow, ipcMain, session } from 'electron';
import fs from "fs/promises";
import path from "path";
import Socket from "../utils/socket"
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

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

  ipcMain.handle("create-client", (_, name) => {
    sock.newClient(name)
  })
  ipcMain.handle("logout-client", async (_, name) => {
    await sock.logout(name)
    await fs.rm(path.join("sessions", name), { recursive: true, force: true } )
  })
  ipcMain.handle("get-profileUrl", async (_, name, id) => {
    const url = await sock.getProfileUrl(name, id)
    return url;
  })
  ipcMain.handle("check-numbers", async (_, name, numbers) => {
    const checked = await sock.checkOnWhatsApp(name, numbers)
    return checked;
  })
  ipcMain.handle("send-message", async (_, name, message, to, media) => {
    await sock.sendMessage(name, message, to, media)
  })
  
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
