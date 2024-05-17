const { screen } = require('electron')
const pos = {
    'left-top': (win) => {
        win.setPosition(0, 0)
    },
    'left-bottom': (win) => {
        const primaryDisplay = screen.getPrimaryDisplay()
        const { height } = primaryDisplay.workAreaSize
        const [ ,winH ] = win.getSize()
        win.setPosition(0, height - winH)
    },
    'right-top': (win) => {
        const primaryDisplay = screen.getPrimaryDisplay()
        const { width } = primaryDisplay.workAreaSize
        const [winW ] = win.getSize()
        win.setPosition(width - winW, 0)
    },
    'right-bottom': (win) => {
        const primaryDisplay = screen.getPrimaryDisplay()
        const { width, height } = primaryDisplay.workAreaSize
        const [ winW, winH ] = win.getSize()
        win.setPosition(width - winW, height - winH)
    }
}
function setPosition (type, win) {
    pos[type](win)
    
}

module.exports = {
    setPosition
}