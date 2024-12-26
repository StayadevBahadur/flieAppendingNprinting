// Please do not change the prewritten code

import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let body = '';

    // Read data in chunks as it's received
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // When all data is received, handle the complete request
    req.on('end', () => {
      // Append the received body to "data.txt" synchronously
      try {
        fs.appendFileSync('data.txt', body + '\n');
        console.log("Data successfully written to file.");

        // Read and print the entire content of "data.txt" to the console
        const data = fs.readFileSync('data.txt', 'utf8');
        console.log("Current file contents:");
        console.log(data);

        // Send a success response to the client
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Data received and stored.');
      } catch (err) {
        // Handle any file errors gracefully
        console.error("File operation error:", err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error writing to file.');
      }
    });
  } else {
    // Handle non-POST requests
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Only POST method is supported on this endpoint.');
  }

  res.end("data received");
});

export default server;
