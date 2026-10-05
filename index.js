// Node.js runs this JavaScript outside the browser.
// Express is a package that helps us build a web server.
const express = require('express');

// The app holds the rules for responding to requests.
const app = express();

// A browser sends a GET request when you visit a page.
// A route connects a URL path, such as '/', to a function.
app.get('/', (req, res) => {
  // req contains information about the incoming request.
  // res lets us send a response back to the browser.
  res.send('Hello, IS117! Your web server is working.');
});

// Each path can have its own response. Try /about in your browser.
app.get('/about', (req, res) => {
  res.send('A web server receives a request and sends a response.');
});

// Express checks routes in order. If none matched, this runs.
// 404 is an HTTP status code meaning the page was not found.
// Successful responses use status code 200 by default.
app.use((req, res) => {
  res.status(404);
  res.send('Page not found.');
});

// Start listening only when we run this file directly with Node.
// When the tests import this file, they start their own test server.
if (require.main === module) {
  // A port identifies which program should receive a connection.
  // localhost means this computer. Keep this program running
  // while visiting http://localhost:3000 in your browser.
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Press Ctrl+C in this terminal to stop the server.');
  });
}

// Exporting lets the test file use the same app.
module.exports = app;
