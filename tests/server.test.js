const app = require('../index');

let server;
let baseUrl;

beforeAll(async () => {
  // Port 0 lets the computer choose a free port for these tests.
  await new Promise((resolve, reject) => {
    server = app.listen(0, '127.0.0.1');
    server.once('listening', resolve);
    server.once('error', reject);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

afterAll(async () => {
  // Close the server and its connections when the tests finish.
  if (server && server.listening) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
      server.closeAllConnections();
    });
  }
});

test('the home page sends a successful response', async () => {
  // fetch sends a request, like visiting a page in a browser.
  const response = await fetch(`${baseUrl}/`);

  // Check both the status number and the text sent back by the server.
  expect(response.status).toBe(200);
  expect(await response.text()).toBe('Hello, IS117! Your web server is working.');
});

test('the about page explains what a web server does', async () => {
  const response = await fetch(`${baseUrl}/about`);

  expect(response.status).toBe(200);
  expect(await response.text()).toBe('A web server receives a request and sends a response.');
});

test('a missing page sends a 404 response', async () => {
  const response = await fetch(`${baseUrl}/missing-page`);

  expect(response.status).toBe(404);
  expect(await response.text()).toBe('Page not found.');
});
