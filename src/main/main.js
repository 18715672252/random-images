// import isDev from " "
const { app, BrowserWindow, screen, nativeImage, Notification } = require('electron')
const { is } = require('@electron-toolkit/utils')
const path = require('path')
// import isDev from "electron-is-dev";
// const isDev = require('electron-is-dev')
require('./ipc.js')
// console.log(process.env)
if (is.dev) {
    app.setAppUserModelId("com.random-imgages.sun")
}
const createWindow = () => {
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width } = primaryDisplay.workAreaSize
    const appW = 400, appH = 90
    const icon = nativeImage.createFromPath(path.resolve(__dirname, '../../build/icons/512x512.png'))
    const win = new BrowserWindow({
        width: appW,
        height: appH,
        x: width - appW,
        y: 0,
        frame: false,
        icon,
        resizable: false,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js')
        }
    })
    win.loadFile(path.resolve(__dirname, '../renderer/index.html'))
    // 设置窗口是否可以由用户手动最大化。
    win.setMaximizable(false)
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})