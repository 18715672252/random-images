const { app, BrowserWindow, screen } = require('electron/main')
const path = require('path')
require('./ipc.js')

const createWindow = () => {
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width } = primaryDisplay.workAreaSize
    const appW = 400, appH = 90
    const win = new BrowserWindow({
        width: appW,
        height: appH,
        x: width - appW,
        y: 0,
        frame: false,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js')
        }
    })

    win.loadFile(path.resolve(__dirname, '../renderer/index.html'))
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