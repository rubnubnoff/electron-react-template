import { app, BrowserWindow } from "electron";
import * as path from "path";
// import * as url from "url";

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL(`http://localhost:4000`);
    } else {
        const url = new URL(path.join(__dirname, 'index.html'));
        url.protocol = "file:"
        mainWindow.loadURL(url.href);
    }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
