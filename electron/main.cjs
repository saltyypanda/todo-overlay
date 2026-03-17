const path = require("path");
const { app, BrowserWindow } = require("electron");

require("electron-reload")(path.join(__dirname, ".."));

function createWindow() {
  const win = new BrowserWindow({
    width: 350,
    height: 650,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.loadFile(path.join(__dirname, "..", "index.html"));
}

app.whenReady().then(createWindow);