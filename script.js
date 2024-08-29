const startTestBtn = document.getElementById('start-test-btn');
const downloadSpeedElement = document.getElementById('download-speed');
const uploadSpeedElement = document.getElementById('upload-speed');
const pingElement = document.getElementById('ping');

startTestBtn.addEventListener('click', startSpeedTest);

function startSpeedTest() {
    startTestBtn.disabled = true;
    startTestBtn.textContent = 'Testing...';

    const startTime = new Date().getTime();
    const fileSize = 10 * 1024 * 1024; // 10MB
    const chunkSize = 1024 * 1024; // 1MB
    const url = 'https://example.com/speedtest.file'; // Replace with your own file URL

    fetch(url, { method: 'HEAD' })
        .then(response => response.headers.get('Content-Length'))
        .then(contentLength => {
            const chunks = Math.ceil(contentLength / chunkSize);
            let chunkCount = 0;
            let startTimeDownload = new Date().getTime();

            for (let i = 0; i < chunks; i++) {
                const startByte = i * chunkSize;
                const endByte = (i + 1) * chunkSize - 1;

                fetch(url, {
                    method: 'GET',
                    headers: {
                        Range: `bytes=${startByte}-${endByte}`
                    }
                })
                    .then(response => response.arrayBuffer())
                    .then(() => {
                        chunkCount++;

                        if (chunkCount === chunks) {
                            const endTimeDownload = new Date().getTime();
                            const downloadTime = endTimeDownload - startTimeDownload;
                            const downloadSpeed = fileSize / downloadTime * 1000;

                            downloadSpeedElement.textContent = `Download speed: ${downloadSpeed.toFixed(2)} Mbps`;

                            startUploadTest();
                        }
                    });
            }
        });
}

function startUploadTest() {
    const fileSize = 10 * 1024 * 1024; // 10MB
    const chunkSize = 1024 * 1024; // 1MB
    const url = 'https://example.com/speedtest.file'; // Replace with your own file URL

    const startTimeUpload = new Date().getTime();

    for (let i = 0; i < fileSize; i += chunkSize) {
        const chunk = new Uint8Array(chunkSize);
        for (let j = 0; j < chunkSize; j++) {
            chunk[j] = Math.random() * 256;
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream'
            },
            body: chunk
        })
            .then(response => response.ok)
            .then(() => {
                if (i + chunkSize >= fileSize) {
                    const endTimeUpload = new Date().getTime
