# Part 1: Run your first Node.js program

**Goal:** create a project folder, save a JavaScript file, and make Node.js print a message. By the end, you should be able to explain where you type code, where you run commands, and where you see the result.

**You need:** Node.js, npm, a text editor, and a terminal. Follow the [setup guide](../setup.md) if you have not installed them. This lesson starts with an empty student folder. The `learn/01-node-and-terminal` reference branch shows the completed result.

## 1. Meet the three tools

A **program** is a set of instructions a computer can carry out. We will write instructions in **JavaScript**, a programming language. **Node.js** runs JavaScript outside a web browser. Today it will run a file on your own computer.

You will work with three different tools:

| Tool | What you do there |
| --- | --- |
| Text editor | Write and save JavaScript in a file. |
| Terminal | Type a command that tells Node.js to run the file. |
| Browser | Read this textbook. Later, visit the web server you create. |

The browser's address bar is not a terminal. Your JavaScript file is not a list of terminal commands. Keeping these places distinct makes the next steps easier to follow.

Open your terminal: **Terminal** on macOS or Linux, or **PowerShell** on Windows. A **prompt** is the text the terminal displays while waiting for a command. It may include a folder path, `$`, or `>`. Its appearance varies. Copy only the command lines below, without adding a prompt symbol.

Run each command separately by typing it and pressing Enter:

```text
node --version
npm --version
```

You should see two version numbers. Node.js should be a supported version 22 or newer. npm comes with the usual Node.js installer; we will use it in Part 2. If a command is not recognized, return to the setup guide before going further.

**Checkpoint:** Which tool will execute JavaScript? Which tool lets you change the file? Answer before continuing: Node.js executes it; the editor changes it.

## 2. Create a home for your work

A **folder**, also called a *directory*, holds files. A new terminal normally starts in your home folder, the folder for your computer account. We can keep this project there. If you have already moved around in the terminal, run `cd ~` in Terminal or PowerShell to return home before starting.

Run:

```text
mkdir is117-web-server
cd is117-web-server
```

`mkdir` means “make directory.” It creates the student project folder. `cd` means “change directory.” It moves the terminal's **working directory**, the folder where commands look for files unless told otherwise. Run `mkdir` once; you do not need to create the folder again each time you work.

Check your location:

```text
pwd
```

On macOS and Linux, `pwd` prints your working directory. PowerShell also understands `pwd`, although it formats the output differently. The path should end with `is117-web-server`.

For later sessions, run `cd ~/is117-web-server` in Terminal or PowerShell to return to this project. You can use `cd ..` to move up one folder; the two dots mean the parent folder. Avoid creating a second `is117-web-server` inside the first one by repeating both setup commands.

## 3. Create and save `index.js`

In your editor, choose **Open Folder** and select `is117-web-server`. Create a new file inside it named exactly:

```text
index.js
```

The **extension**, the part after the dot, is `.js`. It identifies this as a JavaScript file. `index` is the filename we chose; it is not a special command. Make sure the full name is not `index.js.txt`.

Type these two lines into the editor:

```js
// Node.js runs this JavaScript file and prints a message in the terminal.
console.log('Hello, IS117! Node.js is running.');
```

Save the file using **Ctrl+S** on Windows/Linux or **Command+S** on macOS. Node.js reads the saved version on disk, so an unsaved change will not appear when you run it.

The first line is a **comment**: text that helps a person understand the program. `//` starts a comment that continues to the end of that line. Node.js does not execute the words in it.

The second line is an instruction:

- `console.log` prints information in the terminal.
- The parentheses hold what we want to print.
- The quoted text is a **string**, a value made of characters.
- The semicolon ends this instruction.

Use ordinary straight quotes, as shown. Both quotes must be present. The spelling and punctuation of `console.log` matter; `Console.log` is different.

## 4. Predict, run, and explain

Before running it, predict: will the comment appear? Where will the greeting appear?

Return to the terminal that is in `is117-web-server`. Run:

```text
node index.js
```

Expected output:

```text
Hello, IS117! Node.js is running.
```

`node` starts Node.js. `index.js` tells it which file to read. Node.js executes the printing instruction and finishes. The prompt returns because this program has no more work to do. The comment does not appear, and the browser does not change.

Run the same command again. You should get the same greeting again. Running the program does not modify its source file.

**Explain it:** Complete this sentence in your own words: “When I type `node index.js`, my computer …” Include the file, Node.js, and the terminal output.

## 5. Make one small variation

Change only the message between the quotes so it greets you by name. Save, predict the new output, and run `node index.js` again. Then add one additional `console.log` instruction that prints `I saved and ran my first program.`

You should see two lines, in the order they appear in your file. This exercise checks that you can edit, save, and rerun a program without copying a whole new example. Restore the original two-line example before starting Part 2 so your output matches the textbook.

## If something goes wrong

| What you see | What to check |
| --- | --- |
| `node` is not recognized or found | Install Node.js and reopen the terminal. |
| `Cannot find module` with a path to `index.js` | Check the working folder, saved filename, and extension. |
| `SyntaxError` | Compare quotes, parentheses, and punctuation with the example. |
| The old greeting prints | Save the file and confirm you edited the file in this project folder. |
| `mkdir` says the folder already exists | Use `cd is117-web-server` from its parent folder. |

Read the first useful line of an error before changing anything. Errors provide clues; they do not mean your computer is damaged.

## Completion check

Your folder contains `index.js`. You can run it and explain the comment, string, working directory, and returned prompt. There is no web server yet: this program prints once and exits.

## Save your checkpoint evidence

Save the original greeting output and your two-line variation in `learning-log.md`. Explain which tool edits the file and which runs it. Keep `index.js` with the original greeting for Part 2. See the [assignment checklist](../assignment.md) for the full learning record.

[Course home](../../README.md) · [Next: Part 2 — Make an npm project](https://github.com/kaw393939/is117-basic-web-server/blob/main/docs/lessons/02-npm-project.md)
