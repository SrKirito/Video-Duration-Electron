const electron = require('electron');
const { ipcRenderer } = electron

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const { path } = document.querySelector('input').files[0];

    ipcRenderer.send('video:submit', path);

});

ipcRenderer.on('video:metadata', (event, duration) => {
    document.querySelector('#result').innerHTML = `Video is ${duration} seconds long`;
});