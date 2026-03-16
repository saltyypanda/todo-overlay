const { app, BrowserWindow } = require("electron");

require("electron-reload")(__dirname);

function createWindow() {
  const win = new BrowserWindow({
    width: 350,
    height: 800,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);