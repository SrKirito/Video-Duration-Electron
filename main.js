const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const ffmpeg = require('fluent-ffmpeg');

let win;

const createWindow = () => {
    //win.setMenu(null)  
    win.loadFile('index.html');
};


app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
    console.log("Everything is looking fine!");
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
});

ipcMain.on('video:submit', (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        win.webContents.send('video:metadata', metadata.format.duration);
        console.log("Video is", metadata.format.duration, "second long");
    });
});