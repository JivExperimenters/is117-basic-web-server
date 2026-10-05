# Part 3: Your first web server

[Course home](../../README.md) · [Setup](../setup.md) · [Branch guide](../branches.md) · [Glossary](../glossary.md) · [Troubleshooting](../troubleshooting.md)

[Previous: Part 2](https://github.com/kaw393939/is117-basic-web-server/blob/main/docs/lessons/02-npm-project.md) · [Next: Part 4](https://github.com/kaw393939/is117-basic-web-server/blob/main/docs/lessons/04-routes-and-status.md)

**Completed example branch:** `learn/03-first-server`

## What you will build

In Part 2, `npm start` ran a program that printed a message and finished. Now you will make a program that keeps running and answers a browser. A **web server** is a program that receives requests and sends responses. Your browser is the **client**, the program asking the server for something.

You need your Part 2 project open in your editor and a terminal in that project folder. A **terminal** is where you type commands; the **editor** is where you change files. The completed branch is a comparison copy. Follow the steps in your own practice folder rather than switching branches to skip the work. The [branch guide](../branches.md) explains both approaches.

By the end, you should see a greeting at `http://localhost:3000/` and explain which code produced it.

## 1. Add Express

Three names do different jobs:

| Name | Job in this project |
| --- | --- |
| Node.js | Runs your JavaScript program. |
| npm | Installs packages and runs commands from `package.json`. |
| Express | A package of code that helps your program answer web requests. |

A **package** is reusable code written for other programs to use. A **dependency** is a package your project needs. In the terminal, run:

```bash
npm install express@5
```

`@5` selects Express 5, the version this lesson uses. Minor version numbers and package counts may differ from the reference.

npm prints installation information and eventually returns the command prompt. The package count and version numbers can differ. Check your editor: `package.json` now has Express under `dependencies`, npm created or updated `package-lock.json`, and `node_modules` contains installed packages. Express also needs other packages, so that folder contains more than one name. You write your code in `index.js`, not in `node_modules`.

## 2. Replace your console program

Open `index.js`, replace its contents with the complete example below, and save the file. Keep the existing `"start": "node index.js"` command in `package.json`.

```js
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
```

Lines beginning with `//` are **comments**: explanations for people that JavaScript does not execute. Blank lines separate ideas. Indentation helps you see which instructions belong inside the curly braces, `{ }`.

## 3. Read the program a piece at a time

`const express = require('express');` loads the installed Express package. A **variable** is a name that refers to a value. `const` creates a variable whose value you cannot replace by assigning a different value later. Here, `express` is your chosen variable name; `'express'` is a **string**, text inside quotation marks identifying the package to load. The `=` assigns the value on its right to the name on its left.

`require(...)` is Node's way of loading a **module**, code made available for another file to use. This project uses a module style called **CommonJS**, which is why `package.json` says `"type": "commonjs"`. You do not need another module style for this course.

`const app = express();` calls the Express function and gives the resulting application the name `app`. A **function** is a set of instructions you can run. Parentheses, `( )`, after a function name mean "call this function." The application holds our response rules.

`app.get('/', (req, res) => {` registers a **route**: a rule connecting a request method and a path to a function. **GET** is an HTTP method used to ask for a resource. **HTTP** is the set of rules browsers and servers use to exchange these messages. The **path** `/` means the home page. It is not a filename here.

`(req, res) => { ... }` is an **arrow function**. For this route, you could also write `function (req, res) { ... }`. Both forms supply instructions for Express to run later. A function supplied for another piece of code to call is a **callback**. Registering this callback does not send the greeting immediately; Express calls it when a matching request arrives.

`req` refers to the **request**, information arriving from the client. `res` refers to the **response**, the reply you are preparing. These are **objects**, values that group information and useful functions. `res.send(...)` calls the response object's send function, sending the string to the browser and completing this response. The closing `});` ends the callback and the call that registered it.

`const port = 3000;` names a **port**, a number that helps a connection reach the correct running program. `app.listen(port, (error) => { ... });` tries to start listening. Express calls this callback when the server is ready or when starting it fails. If another server already uses port 3000, `error` contains information about the problem.

An **if statement** runs the code inside its braces when its condition is true. Here, `if (error)` checks whether there is an error. `console.error(error.message)` prints its message; `process.exitCode = 1` marks this run as unsuccessful; `return` stops this callback before it prints the success message. When there is no error, we skip that block and print the startup messages with `console.log`. Backticks allow `${port}` to insert the value `3000` into the text.

## 4. Predict, then run

Before running it, predict: will the greeting appear in the terminal or the browser? Will the terminal prompt return immediately?

```bash
npm start
```

After npm's command information, expect:

```text
Server running at http://localhost:3000
Press Ctrl+C in this terminal to stop the server.
```

Keep this terminal running. In your browser's address bar, enter:

```text
http://localhost:3000/
```

**localhost** means your own computer. `http://` selects HTTP; `:3000` selects your server's port; `/` selects the route. Expect:

```text
Hello, IS117! Your web server is working.
```

The program stays alive to answer more requests. The startup messages appear once; refreshing the page calls the route again without printing those messages again.

## 5. Make one small change

Change only the greeting string to include your first name. Predict the browser's new text. Save, click the server terminal, press **Ctrl+C**, and run `npm start` again. Refresh the browser. Saving alone does not restart this program.

Explain aloud: the browser requested `/`, Express called the registered function, and `res.send` sent your new text. Then restore the original greeting, save, and restart so Part 4 begins with the shared example.

You have completed this part when you can start and stop the server, see the greeting, and point to the line that sends it. An unfamiliar error belongs in the [troubleshooting guide](../troubleshooting.md).

For reference, the official [Express application example](https://expressjs.com/en/api/) uses the same require, route, and listen pattern; [Node's CommonJS documentation](https://nodejs.org/api/modules.html) explains `require`.

[Continue to Part 4: Routes and status codes](https://github.com/kaw393939/is117-basic-web-server/blob/main/docs/lessons/04-routes-and-status.md)
