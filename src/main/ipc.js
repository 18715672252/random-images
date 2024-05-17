const { ipcMain, app, net, Notification, BrowserWindow, nativeImage } = require('electron')
const fs = require('fs')
const path = require('path')
const icon = nativeImage.createFromPath(path.resolve(__dirname, '../../resources/512x512.png'))
// const axios = require('axios')
let ext = 'JPG'
let notice = null
// const xhr = new XMLHttpRequest()
ipcMain.handle('format-change', (_event, data) => {
    ext = data
})


ipcMain.handle('download-img', async (event, data) => {
    const time = Date.now()
    const path = app.getPath('desktop')
    try {
        const request = net.request(data)
        const bufs = []
        request.on('response', (response) => {
            response.on('data', (chunk) => {
                // console.log(chunk)
                bufs.push(chunk)
            })
            response.on('end', async () => {
                const buf = Buffer.concat(bufs)
                await fs.promises.writeFile(`${path}/${time}.${ext}`, buf)
                event.sender.send('img-download-finsh')
                notice = new Notification({
                    title: '图片下载完成',
                    body: '图片已经保存到桌面',
                    icon
                })
                notice.show()
                console.log('No more data in response.')
            })
        })
        request.end()
        return 123
    } catch (error) {
        event.sender.send('img-download-error')
        console.log(error)
    }
    
    
})

ipcMain.handle('minimize-window', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win.minimize()
})

ipcMain.handle('close-app', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win.destroy()
    app.quit()
})