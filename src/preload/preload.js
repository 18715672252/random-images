const { contextBridge, ipcRenderer } = require('electron')

const JSBridge = {
    invoke(event, data) {
        ipcRenderer.invoke(event, data)
    },
    ipcRendererEvent(event, callback) {
        ipcRenderer.on(event, callback)
    },
    
}




contextBridge.exposeInMainWorld('electronAPI', JSBridge)