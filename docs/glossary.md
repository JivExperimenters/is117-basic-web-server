# Words used in this course

[Course home](../README.md) · [Setup](setup.md) · [Troubleshooting](troubleshooting.md)

You do not need to memorize this list before starting. Look up a word when it appears in a lesson.

## Programs and files

| Word | Meaning here |
| --- | --- |
| Program | Instructions a computer can run. Our JavaScript program is in `index.js`. |
| JavaScript | The programming language used to write this server. |
| Node.js, or Node | A program that runs JavaScript outside the browser. `node index.js` runs our file. |
| npm | The package manager included with the usual Node installation. It installs packages and runs project commands. |
| Express | A package that helps our Node program receive web requests and send responses. |
| Package | Reusable code distributed for other programs to use. |
| Dependency | A package needed by the running application. Express is one. |
| Development dependency | A package used while developing the application. Jest checks our code but is not needed to serve our pages. |
| `package.json` | The project's settings file, including npm commands and package names. |
| `package-lock.json` | npm's record of the exact package versions chosen for an installation. |
| `node_modules` | The folder npm fills with installed packages. We do not edit it or put it in Git. |
| JSON | A format for structured data. `package.json` uses double quotes and does not allow comments. |
| File path | A file's location, such as `tests/server.test.js`. This is different from the server's URL path `/about`. |
| Editor | The application where you write and save source files. |
| Terminal | The application or panel where you type commands and see their output. |
| Command prompt | The terminal's indication that it is ready for your next command. Its appearance varies. |
| Working directory | The folder your terminal is currently using. Run this project's npm commands in the folder containing its `package.json`. |
| Process | A running program. Our server process stays running until stopped. |

## Reading JavaScript

| Word or symbol | Meaning here |
| --- | --- |
| Comment | An explanation for people that JavaScript ignores. Our comments start with `//`. |
| String | Text inside quotation marks or backticks, such as `'Page not found.'`. |
| Number | A numeric value, such as `3000`. It has no quotation marks in our code. |
| Variable | A name referring to a value, such as `port`. |
| `const` | Creates a variable whose assigned value cannot be replaced later. An object assigned to it can still have changing contents. |
| Object | A value grouping information and functions. `res` is a response object. |
| Function | A set of instructions you can call to perform work. |
| Call | Ask a function to run, using parentheses; for example, `express()`. |
| Argument | A value supplied when calling a function. `3000` is an argument in `app.listen(3000)`. |
| Parameter | A name a function uses for a supplied value. `req` and `res` are parameters of our route callback. |
| Arrow function | A function written using `=>`, such as `(req, res) => { ... }`. |
| Callback | A function given to another piece of code to call. Express calls our route callback when a matching request arrives. |
| Module | Code in a file or package made available for other code to use. |
| CommonJS | The module style this project uses: `require(...)` loads code and `module.exports` shares it. |
| `require` | Loads a package or local module in CommonJS. |
| `module.exports` | Chooses the value another file receives when it loads this module. We share `app` with our tests. |
| Template literal | A string inside backticks that can insert values using `${...}`. Our startup message inserts the port number. |

## Browsers and servers

| Word | Meaning here |
| --- | --- |
| Web server | A program that receives requests and sends responses using web protocols. |
| Client | A program asking a server for something. A browser is one; our tests are also clients. |
| HTTP | Rules for exchanging web requests and responses. |
| GET | An HTTP method asking to retrieve a resource. Visiting our page sends a GET request. |
| Request, or `req` | The message coming from the client. Express gives our callback an object describing it. |
| Response, or `res` | The message sent back to the client. Express gives our callback an object used to prepare it. |
| URL | An address such as `http://localhost:3000/about`. |
| `localhost` | A name meaning the same computer where the client is running. |
| Port | A number helping a connection reach the correct running program. Our manually started server uses `3000`. |
| URL path | The address portion after the host and port, such as `/about`. |
| Route | A rule connecting a method and path to code that handles that request. |
| Middleware | A function involved in handling a request. Our final `app.use` function handles missing paths. |
| Status code | A number describing an HTTP response's result: 200 means success; 404 means not found. |
| Body | The response content. Our pages display the strings sent by `res.send`. |
| Headers | Information accompanying an HTTP message, such as the response's content type. |
| `Content-Type` | A header describing the body's format. Express's string responses default to `text/html`. |
| Developer tools | Browser panels for inspecting a page and its requests. We use the Network panel. |

## Git and tests

These words become useful when comparing branches or reaching Parts 5 and 6.

| Word | Meaning here |
| --- | --- |
| Git | A tool that records versions of project files. |
| Repository, or repo | A project and its recorded Git history. GitHub hosts a copy online. |
| Branch | A named line of Git history. Each `learn/...` branch is a completed course checkpoint. |
| Clone | Make a local copy of a Git repository. |
| Commit | A saved version of tracked files in Git history. Saving a file in the editor does not create a commit. |
| `.gitignore` | A file listing files or folders Git should ignore, such as `node_modules/`. |
| Automated test | Code that checks whether another piece of code behaves as expected. |
| Jest | The package that finds and runs our tests and reports their results. |
| Assertion | A check comparing actual behavior with expected behavior, such as a status being 200. |
| Expected / received | In Jest output, the value the test asked for / the value it actually observed. |
| Asynchronous | Work that can finish later, such as waiting for a server response. |
| Promise | A JavaScript value representing work that will succeed or fail later. |
| `async` | Marks a function that can use `await`; calling it produces a Promise. |
| `await` | Pauses that async function until a Promise finishes. It does not freeze the whole server. |
| `fetch` | A function our tests use to make an HTTP request. |
| Test setup / cleanup | Work that starts resources before tests and stops them afterward. Our tests start and close their server. |
