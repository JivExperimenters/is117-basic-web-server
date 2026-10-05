# Part 2: Make an npm project

**Goal:** turn your folder into an npm project, read its settings, and run the program with `npm start`.

**Starting point:** your `is117-web-server` folder contains the saved `index.js` from [Part 1](01-node-and-terminal.md). It prints `Hello, IS117! Node.js is running.` when you run `node index.js`. The `learn/02-npm-project` reference branch contains the completed example for this part.

## 1. What is npm?

**npm** is a command-line tool included with the usual Node.js installation. It helps manage project settings, install reusable code, and run named commands. A **package** is a collection of reusable code and its settings. We will install Express in Part 3 and Jest in Part 5. This part sets up the project before installing either one.

Your JavaScript program already works. We will tell npm which Node.js command to run, giving everyone working on the project a shared command.

Open the terminal in `is117-web-server`. If you are unsure of the location, use `pwd` in Terminal or PowerShell and check the last folder name. Run `node index.js` once to confirm your starting point.

**Predict:** When we run the program through npm later, will the greeting appear in the browser or terminal? It will still appear in the terminal because the JavaScript instructions have not changed.

## 2. Create `package.json`

Run:

```text
npm init -y
```

`init` means initialize: create the project's initial settings. `-y` tells npm to accept default answers instead of asking several questions. npm prints the settings it created and saves a new file named `package.json` in your working directory. Run this command once while creating the project.

Open `package.json` in the editor. **JSON** means *JavaScript Object Notation*. It is a text format for storing data. Here, the data describes your project.

An **object** groups related settings between braces, `{` and `}`. Each setting has a **key**, its name, followed by a colon and a **value**, the information assigned to it. For example:

```json
"name": "is117-web-server"
```

The key and its text value use double quotes. JSON uses commas between settings and does not allow comments. Do not add `//` explanations inside `package.json`.

You may see slightly different fields depending on your npm version and settings. Read these common ones:

| Setting | Meaning here |
| --- | --- |
| `name` | A label for this project, usually based on the folder name. |
| `version` | The project's version label, initially `1.0.0`. |
| `description` | A brief explanation of the project. |
| `main` | The file other programs would use if they imported this project as a package. |
| `scripts` | Names and commands npm can run for us. |
| `license` | The project's stated software license. |

The instructor's reference project is named `is117-basic-web-server`; your own `is117-web-server` name is fine. Neither a project name nor a version number changes the greeting.

## 3. Add the start command

Use npm to update the settings rather than trying to place JSON commas yourself:

```text
npm pkg set 'scripts.start=node index.js'
npm pkg delete scripts.test
```

The first command adds a script named `start` with the value `node index.js`. The single quotes keep that setting together as one command argument in Terminal and PowerShell. The second command removes the placeholder test command that `npm init` usually creates. That placeholder does not test our program; we will add a real test command in Part 5.

Reopen or refresh `package.json` in your editor. Its `scripts` section should now be:

```json
"scripts": {
  "start": "node index.js"
}
```

You can also record the JavaScript format and minimum Node.js version:

```text
npm pkg set 'type=commonjs' 'engines.node=>=22'
```

`commonjs` names the module format we will use to load Express later. The `engines` setting documents that this project requires Node.js 22 or newer; it does not install or upgrade Node.js for you.

Now run:

```text
npm start
```

Expected output looks like:

```text
> is117-web-server@1.0.0 start
> node index.js

Hello, IS117! Node.js is running.
```

The first lines show which script npm is running; your project name can differ. The final line comes from your JavaScript. npm starts Node.js, which runs `index.js`, and the prompt returns when the program finishes.

**Checkpoint:** Where did npm learn what `start` means? Find the answer in `package.json` before continuing.

## 4. Create the lockfile

Run:

```text
npm install
```

There are no dependencies to download yet. A **dependency** is another package a project needs. This command prepares npm's installation information and creates `package-lock.json`. The terminal may report that packages are up to date; exact counts and wording vary.

The **lockfile** records resolved package versions so future installations can reproduce the dependency tree. It is short now and will grow when we add Express and Jest. Let npm maintain it rather than editing it by hand.

Later, installed packages live in a generated folder named `node_modules`. Do not worry if that folder is absent or empty at this stage; we have not added any packages. Your files still contain all the instructions you wrote.

## 5. Record files Git should ignore

Create a file named exactly `.gitignore` in the project folder, including the leading dot. Save these lines:

```gitignore
node_modules/
*.log
.DS_Store
```

Git records changes to files. A `.gitignore` file tells Git which untracked files to leave out when saving a project version. `node_modules/` contains packages npm can install again. `*.log` matches files ending in `.log`. `.DS_Store` is a file macOS may create to remember folder display settings.

You do not need to install Git to create this file. It prepares your project for sharing later. Keep `package.json` and `package-lock.json`: they tell another person how to install the project. Check that your editor did not save `.gitignore.txt`.

## 6. Practice: predict, run, explain

Change the greeting in `index.js` to `My npm start command works.` Save it. Predict which output line will change, then run `npm start`. The npm script lines remain the same; the greeting changes.

Explain this chain in one sentence: `npm start` → `package.json` → `node index.js` → printed message. Then restore the original greeting for Part 3.

For an independent variation, add a second print instruction with a message of your choice. Run it once using `node index.js` and once using `npm start`. Compare the output. Remove that extra instruction after comparing so your starting file matches the next lesson.

## If something goes wrong

| What you see | What to check |
| --- | --- |
| npm cannot find `package.json` | Your terminal must be inside `is117-web-server`. |
| `Missing script: start` | Run the `npm pkg set` command and inspect `scripts`. |
| A JSON parsing error | Check double quotes and commas if you edited JSON manually. |
| `npm.ps1` cannot run in PowerShell | Use `npm.cmd` in place of `npm`, as explained in [setup](../setup.md). |
| `npm test` is unavailable | That is expected here; Jest arrives in Part 5. |

## Completion check

You have `index.js`, `package.json`, `package-lock.json`, and `.gitignore`. `npm start` prints your original greeting and exits. You can identify a script and explain why the lockfile is kept. Express and Jest have not been installed yet.

[Previous: Part 1](01-node-and-terminal.md) · [Course home](../../README.md) · [Next: Part 3 — Your first web server](https://github.com/kaw393939/is117-basic-web-server/blob/main/docs/lessons/03-first-server.md)
