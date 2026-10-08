// Express helps our program answer web requests.
const express = require('express');
const app = express();

// Answer a GET request for the home page.
app.get('/', (req, res) => {
  res.send('Hello, IS117! Your web server is working.');
});

// Listen on this computer at port 3000.
const port = 3000;
app.listen(port, (error) => {
  // If the port is already in use, show the error instead of a success message.
  if (error) {
    console.error(error.message);
    process.exitCode = 1;
    return;
  }
  console.log(`Server running at http://localhost:${port}`);
  console.log('Press Ctrl+C in this terminal to stop the server.');
});
