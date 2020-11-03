import { app, BrowserWindow, globalShortcut } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

}

app.on('ready', () => {
    createWindow();
    // 注册一个 'CommandOrControl+U' 的全局快捷键
    const ret = globalShortcut.register('CommandOrControl+U', () => {
        // console.log('CommandOrControl+U is pressed')
        if (mainWindow) {
            mainWindow.webContents.send('openWebviewDevTools');
        }
    })
    if (!ret) {
        console.log('CommandOrControl+U: registration failed')
    }
    // 检查快捷键是否注册成功
    console.log('CommandOrControl+U: ' +
        globalShortcut.isRegistered('CommandOrControl+U'))
})

app.on('window-all-closed', () => {
    // 注销快捷键
    globalShortcut.unregister('CommandOrControl+X');
    // 清空所有快捷键
    globalShortcut.unregisterAll()
    if (process.platform !== 'darwin') {
        app.quit()
    }
    server.close();
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */


var ws = require("nodejs-websocket");
console.log("开始建立连接...")

var server = ws.createServer(function(conn) {
    conn.on("text", function(str) {

        console.log("message:" + str)
        conn.sendText("My name is Web Xiu!");
    })
    conn.on("close", function(code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function(code, reason) {
        console.log("异常关闭")
    });
}).listen(8001)
console.log("WebSocket建立完毕")