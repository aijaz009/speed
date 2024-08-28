document.getElementById('startTest').addEventListener('click', function() {
    const speedValue = document.getElementById('speedValue');
    const status = document.getElementById('status');
    const speedMeter = document.getElementById('speedMeter');

    speedValue.innerText = '0';
    status.innerText = 'Testing...';

    // Simulate Download Test
    const imageUrl = 'https://www.gstatic.com/webp/gallery/1.jpg'; // Sample image for testing
    const downloadStartTime = new Date().getTime();
    let downloadedBytes = 0;

    // Create an image element to measure download speed
    const downloadImage = new Image();
    downloadImage.src = imageUrl;

    downloadImage.onload = () => {
        const downloadEndTime = new Date().getTime();
        const duration = (downloadEndTime - downloadStartTime) / 1000; // seconds
        const fileSize = 5000000; // Size of the image in bytes (5 MB)
        const speedMbps = (fileSize * 8 / duration / 1000000).toFixed(2); // Convert to Mbps

        // Update speed value and meter
        updateSpeedMeter(speedMbps);
        speedValue.innerText = speedMbps;
        status.innerText = 'Download test completed!';
    };

    downloadImage.onerror = () => {
        speedValue.innerText = 'Error';
        status.innerText = 'Download test failed.';
    };

    function updateSpeedMeter(speed) {
        const percentage = Math.min(speed / 100, 1) * 100; // Cap at 100 Mbps
        speedMeter.style.background = `conic-gradient(#3b82f6 ${percentage}%, #e5e7eb ${percentage}%)`;
    }
});
