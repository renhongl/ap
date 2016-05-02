(function () {
  'use strict';

  const electron = require('electron');
  const ipc = electron.ipcMain;
  const app = electron.app;
  const BrowserWindow = electron.BrowserWindow;
  const dialog = electron.dialog;

  let mainWindow = null;
  let chatRoomWindow = null;
  let musicPlayerWindow = null;

  let initWindow = function () {
    addMainEvent();
    addChatEvent();
    addMusicEvent();
    addAppEvent();
  };

  function addMainEvent() {
    ipc.on('closeMainWindow', function () {
      app.quit();
    });

    ipc.on('minMainWindow', function () {
      mainWindow.minimize();
    });
  }

  function addChatEvent() {
    ipc.on('closeChatWindow', function () {
      chatRoomWindow.close();
    });

    ipc.on('minChatWindow', function () {
      chatRoomWindow.minimize();
    });

    ipc.on('openChatRoom', function (e,path) {
      // if (chatRoomWindow === null) {
      //   createChatRoomWindow();
      // }
      createChatRoomWindow(path);
    });
  }

  function addMusicEvent() {
    ipc.on('openMusicFolder', function () {
      var path = dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory', 'multiSelections'],
      });
      musicPlayerWindow.webContents.send('loadedFolder', path);
    });

    ipc.on('openMusicPlayer', function () {
      if (musicPlayerWindow === null) {
        createMusicPlayerWindow();
      }
    });

    ipc.on('closePlayerWindow', function () {
      musicPlayerWindow.close();
    });

    ipc.on('minPlayerWindow', function () {
      musicPlayerWindow.minimize();
    });
  }

  function addAppEvent() {
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
  }

  function createMusicPlayerWindow() {
    musicPlayerWindow = new BrowserWindow({
      frame: false,
      height: 450,
      resizable: false,
      width: 600
    });

    musicPlayerWindow.loadURL('file://' + __dirname + '/AP/module/player/index.html');

    //musicPlayerWindow.openDevTools();

    musicPlayerWindow.on('closed', function () {
      musicPlayerWindow = null;
    });
  }

  function createChatRoomWindow(path) {
    chatRoomWindow = new BrowserWindow({
      frame: false,
      height: 506,
      resizable: false,
      width: 375
    });

    chatRoomWindow.loadURL(path);

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

  initWindow();
})();