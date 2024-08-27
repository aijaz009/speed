document.getElementById('startTest').addEventListener('click', function() {
    const startTime = new Date().getTime();
    fetch('assets/testfile') // Replace with a valid file URL
        .then(response => response.blob())
        .then(blob => {
            const endTime = new Date().getTime();
            const duration = (endTime - startTime) / 1000; // in seconds
            const fileSize = blob.size; // in bytes
            const speed = (fileSize / duration) / (1024 * 1024); // in Mbps
            document.getElementById('result').innerText = `Speed: ${speed.toFixed(2)} Mbps`;
            updateAnalogMeter(speed);
        })
        .catch(error => {
            document.getElementById('result').innerText = 'Test failed. Please try again.';
            console.error('Error fetching the file:', error);
        });
});

function updateAnalogMeter(speed) {
    const maxSpeed = 100; // Maximum speed for the meter
    const angle = (speed / maxSpeed) * 180; // Scale the speed to an angle
    const needle = document.getElementById('needle');
    needle.style.transform = `rotate(${angle - 90}deg)`; // Adjust for rotation
}
