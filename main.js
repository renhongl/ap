'use strict';

const electron = require('electron');
const ipc = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;
let chatRoomWindow = null;


ipc.on('closeMainWindow', function () {
  app.quit();
});

ipc.on('minMainWindow', function () {
  mainWindow.minimize();
});

ipc.on('closeChatWindow', function () {
  chatRoomWindow.close();
});

ipc.on('minChatWindow', function () {
  chatRoomWindow.minimize();
});

ipc.on('openChatRoom', function () {
  if (chatRoomWindow === null) {
    createChatRoomWindow();
  }
});

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', function () {

});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

function createChatRoomWindow() {
  chatRoomWindow = new BrowserWindow({
    frame: false,
    height: 506,
    resizable: false,
    width: 375
  });
  
  chatRoomWindow.loadURL('http://localhost:8999/module/chatClient');
  
  //chatRoomWindow.openDevTools();
  
  chatRoomWindow.on('closed', function () {
    chatRoomWindow = null;
  });
}

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    resizable: false,
    icon: ('app/images/qq.ico')
  });

  mainWindow.loadURL('file://' + __dirname + '/AP/html/login.html');

  //mainWindow.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

}
