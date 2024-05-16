const { ipcMain, app, net } = require('electron')
const fs = require('fs')
const { default: axios } = require('axios');
let ext = 'JPG'
let showImg = null
ipcMain.handle('format-change', (event, data) => {
    ext = data
})


ipcMain.handle('download-img', async (event, data) => {
    const { w, h } = data
    const time = Date.now()
    const path = app.getPath('desktop')
    try {
        const res = await axios.get(`https://picsum.photos/${w}/${h}`)
        const request = net.request(res.request.res.responseUrl)
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