# IS117: Your First Web Server

A small Node.js and Express project for students who are new to programming. Read the comments in `index.js` as you explore how a web server works.

## Set up and run

Install [Node.js](https://nodejs.org/) version 22 or newer; choose a supported LTS version. Node.js runs JavaScript outside the browser, and its installer includes npm, which installs this project's packages.

In a terminal, run:

```bash
git clone https://github.com/kaw393939/is117-basic-web-server.git
cd is117-basic-web-server
npm install
npm start
```

Keep that terminal open. The server keeps running until you press **Ctrl+C**.

Open these addresses in your browser:

- [http://localhost:3000/](http://localhost:3000/) — displays `Hello, IS117! Your web server is working.`
- [http://localhost:3000/about](http://localhost:3000/about) — explains what a web server does.
- [http://localhost:3000/missing](http://localhost:3000/missing) — displays `Page not found.` with HTTP status `404`.

## What just happened?

Your browser is the **client**. When you open an address, it sends an HTTP **request** to the server. The server checks the requested path and sends back a **response**. Here, the response contains plain text for your browser to display.

`localhost` means your own computer. The **port**, `3000`, identifies which running server the browser should contact. A **route** connects a request method and path to code: for example, `GET /about` runs the function that responds to the `/about` page. `GET` means the client is asking to retrieve something. A response's **status code** describes the result: `200` means success; `404` means the requested page was not found.

## Explore the files

- `index.js` — the server, with comments explaining each step.
- `tests/server.test.js` — three Jest tests that check the server's responses.
- `package.json` — project settings, commands, and packages.
- `package-lock.json` — records the package versions npm installed.
- `.gitignore` — tells Git to leave out generated files such as `node_modules`.
- `README.md` — these instructions.

**Express** is a dependency because the server uses it when running. **Jest** is a development dependency because we use it to test the server. To add Jest to another project, run `npm install --save-dev jest`.

## Run the tests

Open a second terminal in the project folder and run `npm test`. The tests start and stop their own server; you do not need to run `npm start` first.

## Try a small change

In `index.js`, add a `GET /hello` route above the final `404` handler. Have it send a greeting using `res.send()`. Stop the server with **Ctrl+C**, run `npm start` again, and visit `http://localhost:3000/hello`.

If the browser cannot connect, check that `npm start` is still running and that the address includes `:3000`. If you see `EADDRINUSE`, another program is already using port 3000; stop any earlier copy of this server before starting it again.
