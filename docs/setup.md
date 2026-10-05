# Before you begin

This course starts with an empty folder and ends with a small web server and three automated tests. You will write one JavaScript file, `index.js`, and later one test file. You do not need previous programming experience or an npm account.

There are two ways to use the course. **Build your own project** is the main learning path. The optional **reference copy** lets you inspect the instructor's completed work for each part. Keep these in separate folders so comparing an example does not replace your work.

## 1. Install Node.js and choose an editor

Visit the [official Node.js download page](https://nodejs.org/en/download). Choose a supported **LTS** release, such as Node.js 24 LTS. LTS means *Long Term Support*: a release maintained for an extended period. This project requires Node.js 22 or newer. Choose the installation instructions for your operating system. The usual Windows and macOS installers include **npm**, the command-line tool we will use to manage the project.

A **text editor** creates and changes code files. You can use an editor you already have, or install [Visual Studio Code](https://code.visualstudio.com/). This course does not require signing in to an editor account. Use an editor that saves plain text. A word processor such as Microsoft Word adds document formatting and is not suitable for JavaScript files.

## 2. Open a terminal and check the installation

A **terminal** is a window where you type commands for your computer to run.

| Your computer | Open this terminal |
| --- | --- |
| macOS | Open **Terminal** from Applications → Utilities, or search for it with Spotlight. |
| Windows | Search the Start menu for **PowerShell**. |
| Linux | Open your system's **Terminal** application. |

If the terminal was already open when you installed Node.js, close it and open a new one. Run these commands one at a time. Press Enter after each line:

```text
node --version
npm --version
```

Each command should print a version number. Your Node.js number might look like `v24.21.0`; the exact minor numbers and npm version can differ. The important check is that Node.js is a supported version 22 or newer and both commands work. If the terminal says a command was not found, finish the Node.js installation and reopen the terminal before continuing.

If Windows PowerShell reports that `npm.ps1` cannot run because scripts are disabled, use `npm.cmd --version`. You can use `npm.cmd` wherever the lessons say `npm`. You do not need to change your computer's script policy for this course.

## 3. Choose your course path

### Main path: build your own project

Open [Part 1: Node.js and the terminal](https://github.com/kaw393939/is117-basic-web-server/blob/main/docs/lessons/01-node-and-terminal.md) in your browser. It shows you how to create a folder named `is117-web-server`, save your first `index.js`, and run it. Follow the six lessons in order, making each change in that same folder.

Do not clone the finished project into your student folder before Part 1. The lessons teach you how to create those files yourself. Keep the textbook open in your browser and your own files open in the editor.

### Optional path: inspect the reference branches

**Git** is a tool that records versions of a project. A **repository**, often shortened to *repo*, is a project tracked by Git. **GitHub** hosts repositories online. A **branch** identifies a version of the project; this repository has a branch with the completed code for each lesson.

Install Git using the [official Git download instructions](https://git-scm.com/downloads), then reopen your terminal. Verify it with:

```text
git --version
```

In a folder where you keep school projects, run:

```text
git clone https://github.com/kaw393939/is117-basic-web-server.git is117-reference
cd is117-reference
git switch learn/01-node-and-terminal
node index.js
```

`git clone` downloads the reference project into `is117-reference`. `cd` moves the terminal into that folder. `git switch` selects the completed Part 1 version. The final command prints:

```text
Hello, IS117! Node.js is running.
```

These commands operate on the reference folder. They do not create your separate `is117-web-server` student project.

To inspect later examples, choose the appropriate branch and install its recorded packages:

| Completed example | Branch | Commands after switching |
| --- | --- | --- |
| Part 1: first Node.js program | `learn/01-node-and-terminal` | `node index.js` |
| Part 2: npm project | `learn/02-npm-project` | `npm ci`, then `npm start` |
| Part 3: first web server | `learn/03-first-server` | `npm ci`, then `npm start` |
| Part 4: routes and status codes | `learn/04-routes-and-status` | `npm ci`, then `npm start` |
| Part 5: first test | `learn/05-first-test` | `npm ci`, then `npm test` |
| Part 6: complete tests | `learn/06-complete-tests` | `npm ci`, then `npm test` |

For example, to inspect Part 3:

```text
git switch learn/03-first-server
npm ci
npm start
```

`npm ci` installs the exact package versions listed in that branch's `package-lock.json`. Part 1 has no npm project yet, so it does not use `npm ci`. Parts 1–4 have no Jest tests yet, so they do not use `npm test`.

The server in Parts 3–6 stays running until you press **Ctrl+C** in its terminal. Stop it before switching branches. Treat the reference folder as a place to read and run examples; make lesson exercises in your student folder. If Git refuses a switch because you edited reference files, save a copy of any changes you want to keep and ask your instructor for help rather than deleting unfamiliar files.

## Keep a learning record

Read the [assignment checklist](assignment.md). Create `learning-log.md` in your student project to record each part’s prediction, actual result, and explanation before restoring practice changes. Your reference clone remains a separate comparison copy.

## Ready check

You are ready when you can open a terminal, run `node --version` and `npm --version`, and open a plain-text editor. Git is optional for the build-from-scratch path. Start with [Part 1](https://github.com/kaw393939/is117-basic-web-server/blob/main/docs/lessons/01-node-and-terminal.md), or return to the [course home](../README.md).
