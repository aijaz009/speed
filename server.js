const http = require('http');
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');

http.createServer((req, res) => {
  fs.readFile(indexPath, (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      res.writeHead(404);
      res.end('Error: File not found');
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
}).listen(3000, () => {
  console.log('Server started on port 3000');
});
