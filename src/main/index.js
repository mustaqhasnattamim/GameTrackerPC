import { app, shell, BrowserWindow, ipcMain, dialog, Tray, Menu } from 'electron'
import fs from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

let mainWindow = null;
let tray = null;
let isQuitting = false;

// --- SINGLE INSTANCE LOCK ---
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  // If another version is already running, instantly close this duplicate
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // If user clicks the Start Menu icon again, bring the hidden window to the front
    if (mainWindow) {
      if (mainWindow.isVisible() === false) mainWindow.show();
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1200, height: 800, minWidth: 960, minHeight: 672,
      show: false, autoHideMenuBar: true, icon: icon,
      webPreferences: { 
        preload: join(__dirname, '../preload/index.js'), 
        sandbox: false,
        backgroundThrottling: false 
      }
    })

    mainWindow.on('ready-to-show', () => { 
      if (!process.argv.includes('--hidden')) {
        mainWindow.show();
      }
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);
      return { action: 'deny' };
    });

    mainWindow.on('close', (event) => {
      if (!isQuitting) {
        event.preventDefault();
        mainWindow.hide();
        event.returnValue = false;
      }
    });

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }

  app.whenReady().then(() => {
    electronApp.setAppUserModelId('com.gametracker')

    if (app.isPackaged) {
      app.setLoginItemSettings({ openAtLogin: true, args: ['--hidden'] });
    } else {
      app.setLoginItemSettings({ openAtLogin: false });
    }

    tray = new Tray(icon);
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Open Dashboard', click: () => mainWindow.show() },
      { type: 'separator' },
      { label: 'Exit Tracker', click: () => { isQuitting = true; app.quit(); } }
    ]);
    tray.setToolTip('Game Tracker PC - Running in Background');
    tray.setContextMenu(contextMenu);
    tray.on('double-click', () => mainWindow.show());

    const systemProcesses = [
      'svchost.exe', 'explorer.exe', 'cmd.exe', 'conhost.exe', 'dwm.exe', 'taskhostw.exe', 
      'lsass.exe', 'csrss.exe', 'wininit.exe', 'services.exe', 'smss.exe', 'fontdrvhost.exe', 
      'winlogon.exe', 'spoolsv.exe', 'runtimebroker.exe', 'nvcontainer.exe', 'searchapp.exe', 
      'ctfmon.exe', 'applicationframehost.exe', 'taskmgr.exe', 'sihost.exe', 'dllhost.exe',
      'securityhealthservice.exe', 'msmpeng.exe', 'system', 'registry', 'wmiprvse.exe',
      'smartscreen.exe', 'startmenuexperiencehost.exe', 'audiodg.exe', 'wlanext.exe'
    ];

    ipcMain.handle('scan-processes', () => {
      return new Promise((resolve) => {
        exec('tasklist /NH /FO CSV', (err, stdout) => {
          if (err) return resolve([]);
          const processes = stdout.split('\n')
            .map(line => line.split(',')[0].replace(/"/g, ''))
            .filter(p => p.toLowerCase().endsWith('.exe') && !systemProcesses.includes(p.toLowerCase()));
          resolve([...new Set(processes)].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())));
        });
      });
    });

    ipcMain.on('exit-app', () => { isQuitting = true; app.quit(); });

    createWindow()
    app.on('activate', function () { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
  })
}