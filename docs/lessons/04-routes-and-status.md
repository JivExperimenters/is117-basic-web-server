# Part 4: Routes and status codes

[Course home](../../README.md) · [Setup](../setup.md) · [Branch guide](../branches.md) · [Glossary](../glossary.md) · [Troubleshooting](../troubleshooting.md)

[Previous: Part 3](https://github.com/kaw393939/is117-basic-web-server/blob/main/docs/lessons/03-first-server.md) · [Next: Part 5](https://github.com/kaw393939/is117-basic-web-server/blob/main/docs/lessons/05-first-test.md)

**Completed example branch:** `learn/04-routes-and-status`

## What you will build

Your server already answers a GET request for `/`. This part gives it a second route and a deliberate answer for a missing page. A **route** is a rule connecting a request method and path to code. A **status code** is a number in the HTTP response describing the result of the request.

You will compare what the browser displays with what the server reports. Those are related, but the visible words alone do not tell you the status code.

Begin with your completed Part 3 project. Express is already installed. Keep using one `index.js`; you do not need another JavaScript file yet. If the server is running, stop it with **Ctrl+C** in its terminal before editing.

## 1. Give two paths different answers

Replace `index.js` with this complete example and save it:

```js
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
```

The first two lines still load Express and create the application. The home route is unchanged. The new `app.get('/about', ...)` registers another GET route. Its callback, the function supplied for Express to call later, sends a different string. `'/'` and `'/about'` are paths, not filenames. Express can answer both from this one file.

The next new line, `app.use((req, res) => {`, registers a function that applies to requests reaching this point, regardless of their path. Express calls this kind of function **middleware**, code that participates in handling a request. We use it here as the final missing-page answer.

`res.status(404);` chooses the HTTP status code. **404** means the requested resource was not found. This line sets the status; it does not send the response yet. The following `res.send('Page not found.');` sends the body and completes the response. The **body** is the response's content, which is what this browser page displays.

The closing `});` ends that callback and the registration call. The port and listen block still start the server at the same address. No new package is needed.

## 2. Why the order matters

Express checks these rules in the order you register them. In our program, a matching route sends the response and ends that request's handling. A request for `/about` passes the home route, matches the about route, and receives its message.

For `/missing-page`, neither GET route matches. This is an intentionally unknown path, not a route you need to add. Another unmatched path, such as `/something-else`, reaches the same handler. Handling reaches the final `app.use` function, which sends status 404 and our missing-page message. If you put that function above the routes, it would answer first, including for `/` and `/about`. Those later routes would not get a chance to send their responses.

We deliberately keep the catch-all response last. This is also why an additional route must go above it. Read more about registration order in the official [Express application API](https://expressjs.com/en/5x/api/application/).

## 3. Predict, run, and compare

Predict the message for each path in the table before starting the server:

| Browser address | Expected body | Expected status |
| --- | --- | --- |
| `http://localhost:3000/` | `Hello, IS117! Your web server is working.` | 200 |
| `http://localhost:3000/about` | `A web server receives a request and sends a response.` | 200 |
| `http://localhost:3000/missing-page` | `Page not found.` | 404 |

Now run:

```bash
npm start
```

Expect the same startup messages as Part 3:

```text
Server running at http://localhost:3000
Press Ctrl+C in this terminal to stop the server.
```

Visit all three addresses. The first two use the default success status, **200**. Our last function explicitly selects **404**. A 404 response here shows that your server received the request and answered it; a browser message saying it cannot connect indicates a different problem.

## 4. Look behind the displayed words

Your browser includes **developer tools**, panels that show what happens when a page loads. To inspect one request:

1. In Chrome, Edge, or Firefox, right-click the page and choose **Inspect**. On a Mac you can also use **Command+Option+I**; on Windows use **Ctrl+Shift+I**. In Safari, enable the developer tools in its settings first.
2. Choose the **Network** tab. Open it before refreshing, because it records requests while open.
3. Visit `/about` or refresh it. Select the request named `about`, usually marked as a document.
4. Find its status code in **Headers**. Expect `200` on this fresh load. The **Response** tab shows the about message.
5. Visit `/missing-page`, select that document request, and find `404` and `Page not found.`.

**Headers** are information accompanying the body. One header, `Content-Type`, tells the client the content format. Express sends a string with a `text/html` content type by default, even though our simple strings contain only ordinary text. The browser displays that text. See the official [Express response API](https://expressjs.com/en/5x/api/response/#res-send) for this behavior.

If a repeat visit shows `304` because the browser reused a saved copy, disable caching in the Network panel and reload while that panel is open. The table describes fresh responses. You may also see a request for `favicon.ico`, the small browser-tab icon. We have no icon route, so its 404 is expected; inspect the document request for your chosen page.

## 5. Trace one trip through the server

Explain a visit to `/about` in order:

1. The browser sends a GET request to `localhost`, port `3000`, path `/about`.
2. The running Node program receives it; Express checks the registered rules.
3. The home path does not match. The about path matches, so Express calls that callback with `req` and `res`.
4. `res.send` sends the about message with status 200.
5. The browser receives the response and displays its body. The server keeps listening.

The terminal may stay quiet during this trip: our program prints startup messages, not a message for every request.

## 6. Add your own route

Without copying another full example, add a GET route for `/hello` above the final `app.use`. Use the about route as a pattern and send a greeting of your choice. Predict both its body and status.

Save, stop the server with **Ctrl+C**, run `npm start` again, and visit `http://localhost:3000/hello`. Verify your greeting and status 200. Then remove this practice route, save, and restart to return to the shared example before Part 5.

You have completed this part when all three original paths behave as predicted and you can explain why the missing-page function must come last.

[Continue to Part 5: Your first test](https://github.com/kaw393939/is117-basic-web-server/blob/main/docs/lessons/05-first-test.md)
