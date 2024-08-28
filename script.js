document.getElementById('startTest').addEventListener('click', function() {
    const pingValue = document.getElementById('pingValue');
    const downloadValue = document.getElementById('downloadValue');
    const uploadValue = document.getElementById('uploadValue');
    const status = document.getElementById('status');

    pingValue.innerText = 'Testing...';
    downloadValue.innerText = 'Testing...';
    uploadValue.innerText = 'Testing...';
    status.innerText = '';

    // Simulate Ping Test
    const pingStart = new Date().getTime();
    fetch('https://www.google.com/favicon.ico', { method: 'HEAD' })
        .then(() => {
            const pingEnd = new Date().getTime();
            const ping = pingEnd - pingStart;
            pingValue.innerText = ping;
        })
        .catch(() => {
            pingValue.innerText = 'Error';
        });

    // Simulate Download Test
    const downloadStart = new Date().getTime();
    const downloadImage = new Image();
    downloadImage.src = 'https://www.gstatic.com/webp/gallery/1.jpg'; // Sample image for download test
    downloadImage.onload = () => {
        const downloadEnd = new Date().getTime();
        const duration = (downloadEnd - downloadStart) / 1000; // seconds
        const fileSize = 5000000; // Size of the image in bytes (5 MB)
        const speedMbps = (fileSize * 8 / duration / 1000000).toFixed(2); // Convert to Mbps
        downloadValue.innerText = speedMbps;
        status.innerText = 'Download test completed!';
    };

    // Simulate Upload Test
    const uploadStart = new Date().getTime();
    const uploadData = new Blob(new Array(5000000).fill('a')); // 5 MB of data
    const uploadRequest = new XMLHttpRequest();
    uploadRequest.open('POST', 'https://httpbin.org/post', true);
    uploadRequest.onload = () => {
        const uploadEnd = new Date().getTime();
        const duration = (uploadEnd - uploadStart) / 1000; // seconds
        const speedMbps = (fileSize * 8 / duration / 1000000).toFixed(2); // Convert to Mbps
        uploadValue.innerText = speedMbps;
        status.innerText += ' Upload test completed!';
    };
    uploadRequest.send(uploadData);
});
