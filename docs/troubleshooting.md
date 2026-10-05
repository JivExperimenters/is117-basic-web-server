# When something does not work

[Course home](../README.md) · [Setup](setup.md) · [Branch guide](branches.md) · [Glossary](glossary.md)

Read the first error message before changing code. Match it with a situation below. If you ask your instructor for help, include the command you ran, the lesson number, and the error text.

## `node` or `npm` is not found

Messages include `command not found`, `is not recognized`, or `The term ... is not recognized`.

Install Node.js from the [official download page](https://nodejs.org/en/download). Choose a supported **LTS** version, a release maintained for longer-term use. This course uses Node 22 or newer. Close and reopen the terminal after installation; if you use an editor's terminal, reopen the editor too. Then run each command separately:

```bash
node --version
npm --version
```

Each should print a version number. Do not type a sample output such as `v24...` as a command. npm normally comes with the Node installer. See [npm's installation instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) if the two commands still disagree.

## npm prints warnings during installation

A line marked `npm warn` is different from `npm error`. You may see warnings about a dependency being deprecated, security audit results, or install-script settings. Counts and messages can vary by npm version. Wait for the command prompt to return, then run the lesson's checkpoint command. A warning alone does not demonstrate that installation failed or that the checkpoint is correct.

If installation ends with an error or the checkpoint does not work, save the command and full error text and ask your instructor. Do not approve unfamiliar install scripts or run `npm audit fix --force` just to make your terminal match a screenshot. The reference uses `npm ci` to reproduce its lockfile; the student path adds Express 5 and Jest 30 at their respective lessons.

## Windows PowerShell says `npm.ps1` cannot run

If Node is installed but PowerShell blocks the `npm.ps1` script, try the Windows command wrapper:

```powershell
npm.cmd --version
```

Stay in PowerShell and replace `npm` with `npm.cmd` in later lesson commands. For example, use `npm.cmd start` once you have set up the project in Part 2, and `npm.cmd test` in Parts 5 and 6. The lessons use quoting that works in PowerShell; Windows Command Prompt handles quotes differently. Ask your instructor if the computer is managed and this option is blocked too.

## npm cannot find `package.json`

An error mentioning `ENOENT` and `package.json` often means the terminal is in the wrong folder. In your editor, open the project folder containing `index.js` and `package.json`, then open a terminal there.

To check the current location:

| System | Show current folder | List files |
| --- | --- | --- |
| macOS / Linux | `pwd` | `ls` |
| Windows PowerShell | `Get-Location` | `Get-ChildItem` |
| Windows Command Prompt | `cd` | `dir` |

`cd` changes folders when followed by a path. For example, after the course's clone command, `cd is117-reference` enters the reference folder. Your own practice folder is `is117-web-server`. If a folder path contains spaces, put quotation marks around the path.

Part 1 has no `package.json` yet: use `node index.js` there. Create the npm project in Part 2 before using `npm start`.

## `Cannot find module 'express'` or `jest` is not found

Being present in `package.json` does not mean a package is installed on this computer. In the project folder, run:

```bash
npm install
```

This recreates `node_modules` using the project's package settings. In your from-scratch exercise, Express is first added in Part 3 with `npm install express@5`; Jest is first added in Part 5 with `npm install --save-dev jest@30`. Do not expect either on an earlier checkpoint.

If you specifically omitted development dependencies, Jest was omitted too. Run `npm install --include=dev` in the final project to include it.

## `npm test` says a script is missing or prints a placeholder

Tests are introduced in Part 5. Earlier branches intentionally do not run Jest. An npm-generated placeholder may say `Error: no test specified`; it is not a test of your server.

From Part 5 onward, inspect `package.json` and check that its `scripts` object contains:

```json
"test": "jest --runInBand"
```

Keep the `start` entry too, separated from `test` with a comma. Save the file, install the packages, and run `npm test` again.

## `npm ci` reports a lockfile mismatch

`npm ci` is a stricter installation command used for checked-in checkpoints. It requires `package-lock.json` to agree with `package.json` and does not update either file. If you intentionally added or changed a package while building your practice project, run `npm install` to update the lockfile, then retry.

If you are inspecting an untouched checkpoint, check that both files came from that same branch. Read the [branch guide](branches.md) before switching branches with your own unfinished edits. See the official [npm ci documentation](https://docs.npmjs.com/cli/v11/commands/npm-ci) for the difference.

## `package.json` has a JSON error

JSON is a strict data format. Its property names and string values need double quotes. It does not permit `//` comments or a comma after the last entry in an object. Check the line named in the error and the line immediately before it.

In this fragment, there is a comma between two commands and none after the last:

```json
"scripts": {
  "start": "node index.js",
  "test": "jest --runInBand"
}
```

That fragment belongs inside the outer `{ }` of the complete `package.json`; it is not a complete replacement file.

## The browser cannot connect

For Parts 3–6, run `npm start` and look for the startup message. Keep that terminal open with the program running. Use the exact address:

```text
http://localhost:3000/
```

Include `http://`, not `https://`, and include `:3000`. Enter the address in the browser's address bar, not the terminal or a search engine. `localhost` means the computer using that browser; opening it on your phone does not reach the server running on your laptop.

If the terminal shows an error instead of the startup message, solve that error first. A page saying `Page not found.` means the server answered; check the path you entered.

## `EADDRINUSE`: port 3000 is already in use

You may have an earlier copy of this server running. Find the terminal where you started that copy and press **Ctrl+C**. Then return to the new terminal and run `npm start` once.

If another application owns the port, ask your instructor before stopping it. Do not repeatedly start extra copies. The tests in Parts 5 and 6 use their own temporary port, so a manually started server is not required for `npm test`.

## I saved a change, but the browser still shows the old text

This project's `npm start` command does not automatically reload code. Save `index.js`, stop the server with **Ctrl+C**, and run `npm start` again. Refresh the browser. Also check that the editor and terminal are using the same project folder, especially if you made both a practice copy and a reference clone.

If `/hello` still returns 404, put that route above the final `app.use` handler and restart again. The final handler answers requests that reach it before later routes can run.

## Jest reports different `Expected` and `Received` values

`Expected` is what the assertion asked for. `Received` is what the server actually returned. Compare them carefully: spelling, punctuation, capitalization, and spaces matter when checking exact strings. The shared home response includes `Your web server is working.`.

If you changed a response as an exercise, the original test can correctly fail. Restore the shared example or update the test only when your intended requirement changed. Changing an expected value simply to turn a result green does not fix an incorrect server.

## Jest does not finish, or importing the server starts port 3000

First, let Jest finish a normal run; it returns to the prompt. A manual server started with `npm start` is supposed to keep running.

In Part 5, the startup block moves inside `if (require.main === module)`. Without that check, importing `index.js` starts another server immediately. Compare your startup block with the worked Part 5 example and confirm `module.exports = app` is present. The tests need to create and close their own server.

In Part 6, also compare the cleanup that closes the test server. Copying only the assertions can leave a listening server open. The [Node module documentation](https://nodejs.org/api/modules.html#accessing-the-main-module) explains the direct-run check.

## Git shows thousands of `node_modules` files

Check that `.gitignore` contains a line with:

```text
node_modules/
```

Save `.gitignore`. npm downloads those files again, so they do not belong in our repository. If you already committed them, ask your instructor to help remove them from Git's tracked files; adding an ignore rule does not remove previously tracked files.

Keep `package.json`, `package-lock.json`, your source, and your tests. These describe the project and let another student install its packages.
