const express = require('express');
const app = express();

app.get('/download-test-file.txt', (req, res) => {
    // Serve the download test file
    res.sendFile(__dirname + '/download-test-file.txt');
});

app.post('/upload-test-file.txt', (req, res) => {
    // Handle the upload test file
    const uploadTime = req.body.uploadTime;
    // Store the upload time in a database or file
    res.send(`Upload time: ${uploadTime}`);
});

app.get('/ping-test.txt', (req, res) => {
    // Serve the ping test file
    res.sendFile(__dirname + '/ping-test.txt');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
