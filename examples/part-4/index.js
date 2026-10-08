// Express helps our program answer web requests.
const express = require('express');
const app = express();

// Answer a GET request for the home page.
app.get('/', (req, res) => {
  res.send('Hello, IS117! Your web server is working.');
});

// A second path gets a different response.
app.get('/about', (req, res) => {
  res.send('A web server receives a request and sends a response.');
});

// Keep the missing-page response after all of our routes.
app.use((req, res) => {
  res.status(404);
  res.send('Page not found.');
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
