document.getElementById('startTest').addEventListener('click', function() {
    const speedValue = document.getElementById('speedValue');
    const status = document.getElementById('status');
    speedValue.innerText = 'Testing...';
    status.innerText = '';

    // Start the speed test
    const startTime = new Date().getTime();
    const imageUrl = 'https://www.gstatic.com/webp/gallery/1.jpg'; // A sample image for testing
    const downloadSize = 5000000; // Size of the test file in bytes (5 MB)
    
    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            const endTime = new Date().getTime();
            const duration = (endTime - startTime) / 1000; // Duration in seconds
            const bitsLoaded = downloadSize * 8; // Convert bytes to bits
            const speedMbps = (bitsLoaded / duration / 1000000).toFixed(2); // Speed in Mbps

            speedValue.innerText = speedMbps; // Display speed
            status.innerText = 'Test completed!';
        })
        .catch(error => {
            console.error('Error:', error);
            speedValue.innerText = 'Error';
            status.innerText = 'Test failed. Please try again.';
        });
});
