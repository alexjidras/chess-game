const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const Swipl = require('./swipl');

let swipl;

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 760,
      height: 760,
      useContentSize: true,
      autoHideMenuBar: true,
      webPreferences: {
        preload: __dirname + '/preload.js'
      }
    });
  
    // and load the index.html of the app.
    if (process.env.NODE_ENV === 'development') {
      mainWindow.loadURL('http://localhost:8080/');
      // Open the DevTools.
      require('vue-devtools').install();
      // mainWindow.webContents.openDevTools();
    } else {
      mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
    }

    ipcMain.on('app-events', (_, event) => {
      if(event === 'EXIT') {
        app.quit();
      }
    })

    mainWindow.webContents.once('did-finish-load', () => {
      swipl = new Swipl(mainWindow.webContents);
      ipcMain.on('game-events', (_, event, ...args) => {
        switch (event) {
          case 'COLOR_CHOOSE': swipl.write(args[0]); break; 
          case 'MOVE': swipl.call(args[0]); break;
          case 'START': swipl.startGame(); break;
          case 'RESTART': swipl.restartGame(args[0]); break;
          case 'STOP': swipl.stopGame(); break;
        }
      })
    });
  };
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
      app.quit();
    // }
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