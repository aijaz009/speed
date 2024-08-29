const startTestButton = document.getElementById('start-test');
const testResultsContainer = document.getElementById('test-results');

startTestButton.addEventListener('click', () => {
    // Send HTTP request to download a file
    const downloadRequest = new XMLHttpRequest();
    downloadRequest.open('GET', 'download-test-file.txt', true);
    downloadRequest.onload = () => {
        const downloadTime = downloadRequest.responseText;
        const downloadSpeed = calculateDownloadSpeed(downloadTime);
        displayTestResult('Download Speed:', downloadSpeed);
    };
    downloadRequest.send();

    // Send HTTP request to upload a file
    const uploadRequest = new XMLHttpRequest();
    uploadRequest.open('POST', 'upload-test-file.txt', true);
    uploadRequest.onload = () => {
        const uploadTime = uploadRequest.responseText;
        const uploadSpeed = calculateUploadSpeed(uploadTime);
        displayTestResult('Upload Speed:', uploadSpeed);
    };
    uploadRequest.send();

    // Measure ping
    const pingRequest = new XMLHttpRequest();
    pingRequest.open('GET', 'ping-test.txt', true);
    pingRequest.onload = () => {
        const pingTime = pingRequest.responseText;
        const ping = calculatePing(pingTime);
        displayTestResult('Ping:', ping);
    };
    pingRequest.send();
});

function calculateDownloadSpeed(downloadTime) {
    // Calculate download speed based on the time it took to download the file
    return downloadTime / 1024; // Convert to kilobits per second
}

function calculateUploadSpeed(uploadTime) {
    // Calculate upload speed based on the time it took to upload the file
    return uploadTime / 1024; // Convert to kilobits per second
}

function calculatePing(pingTime) {
    // Calculate ping based on the time it took to receive the response
    return pingTime / 1000; // Convert to milliseconds
}

function displayTestResult(label, value) {
    const testResultElement = document.createElement('p');
    testResultElement.textContent = `${label} ${value} `;
    testResultsContainer.appendChild(testResultElement);
}
