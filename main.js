'use strict';

const electron = require('electron');
const ipc = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = require('global-shortcut');

let mainWindow = null;
let settingsWindow = null;

ipc.on('closeWindow',function(){
   app.quit();
});

ipc.on('minusWindow',function(){
   mainWindow.minimize();
});

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', function() {
  globalShortcut.unregisterAll();
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

function createWindow () {

  mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      frame: true,
      resizable: false,
      icon: ('app/images/qq.ico')
    });

  mainWindow.loadURL('file://' + __dirname + '/AP/html/login.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

}
