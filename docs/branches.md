# Read and run the six worked branches

[Course home](../README.md) · [Setup](setup.md) · [Troubleshooting](troubleshooting.md)

A **repository** is a project tracked by Git. A **branch** is a named version of that project. Switching a branch changes the files you see in your local reference folder. It does not open a second copy of the program or start a server.

`main` is the full textbook and finished program. The six `learn/...` branches are cumulative worked checkpoints: Part 2 starts from Part 1, Part 3 starts from Part 2, and so on. Each keeps the earlier work and adds one lesson's changes.

## Choose a checkpoint

| Branch | Files and behavior added | How to run the reference |
| --- | --- | --- |
| [learn/01-node-and-terminal](https://github.com/kaw393939/is117-basic-web-server/tree/learn/01-node-and-terminal) | `index.js` prints a message; no packages yet | `node index.js` |
| [learn/02-npm-project](https://github.com/kaw393939/is117-basic-web-server/tree/learn/02-npm-project) | `package.json`, lockfile, and start script | `npm ci`, then `npm start` |
| [learn/03-first-server](https://github.com/kaw393939/is117-basic-web-server/tree/learn/03-first-server) | Express and a home route | `npm ci`, then `npm start` |
| [learn/04-routes-and-status](https://github.com/kaw393939/is117-basic-web-server/tree/learn/04-routes-and-status) | `/about` and a final `404` handler | `npm ci`, then `npm start` |
| [`examples/part-5`](../examples/part-5) | Jest, importable app, and one home-page test | From `examples/part-5`, run `npm ci`, then `npm test`; `npm start` runs the server |
| [`examples/part-6`](../examples/part-6) | About-page and missing-page tests | From `examples/part-6`, run `npm ci`, then `npm test`; `npm start` runs the server |

The code on a branch or in an `examples/` folder is the **completed example for that part**. To learn by building, follow the lesson in your own `is117-web-server` folder. You can inspect the matching reference in your browser, or keep a separate `is117-reference` clone to run the instructor's example.

## Clone the reference once

Install Git first; [setup](setup.md) has the link. In a terminal, run these commands one at a time:

```bash
git clone https://github.com/kaw393939/is117-basic-web-server.git is117-reference
cd is117-reference
git switch learn/01-node-and-terminal
node index.js
```

`git clone` downloads the repository into a new folder. `cd` enters that folder. `git switch` selects a checkpoint. Run commands from the folder containing the selected branch's `index.js` and README. Read that README before running it.

You only clone once. Do not run `npm init` in the reference clone: its Part 2 and later branches already contain the completed npm project.

## Move from Part 1 to Part 2

In the reference terminal:

```bash
git status
git fetch origin
git switch learn/02-npm-project
npm ci
npm start
```

`git status` tells you whether you changed any tracked files. If you made experiments you want to keep, copy them to your own project before switching. Do not use a reset command to get around a warning about unsaved work.

`git fetch origin` downloads updated branch information from GitHub. `origin` is Git's usual name for the repository you cloned. Fetching does not change your current files. `git switch` changes them to the selected checkpoint.

`npm ci` installs exactly the package versions in `package-lock.json`. It replaces that clone's generated `node_modules` folder so it matches the selected branch. It does not edit your source files. In your own project, use `npm install` when adding a package or creating/updating your lockfile.

## Move to a server or test checkpoint

Before switching away from a running server, press **Ctrl+C** in its terminal. A server already running in memory does not become the new branch's program just because its files changed.

For Part 3:

```bash
git status
git switch learn/03-first-server
npm ci
npm start
```

Visit `http://localhost:3000/` in your browser. To continue, stop the server and repeat the same steps with `learn/04-routes-and-status`.

For Part 5, move into its example folder and run:

```bash
cd examples/part-5
npm ci
npm test
```

Expect **one passing test**. Run `npm start` in the same folder if you also want to see the server in a browser. For Part 6, run `cd ../part-6`, then `npm ci` and `npm test`; expect **three passing tests**. Tests start their own temporary server, so you do not need `npm start` first.

If Git cannot find a learning branch, fetch again. If it still cannot select it automatically, use this form **only when the local branch does not already exist**:

```bash
git switch --track origin/learn/05-first-test
```

You can return to the full textbook with `git switch main`, after stopping any server and saving your edits.

## Compare two neighboring parts

On GitHub, [compare Part 3 with Part 4](https://github.com/kaw393939/is117-basic-web-server/compare/learn/03-first-server...learn/04-routes-and-status). Added lines show the new route and missing-page handler. The earlier home route remains.

You can also compare locally:

```bash
git diff origin/learn/03-first-server..origin/learn/04-routes-and-status -- index.js package.json tests
```

`git diff` displays changes; it does not change any files. The names before and after `..` are the two checkpoints. After `--`, the file names limit the display to program files. Try comparing Parts 5 and 6: the server stays the same while two tests are added.

## For maintainers

`main` holds the canonical final `index.js`, test file, full lessons, and small maintenance tools. Export all six complete branch trees with `node tools/build-lessons.js --output ../is117-lessons`. This creates new folders; it does not change Git.

Publish those trees on the six named branches in order. Part 2's commit should have Part 1's commit as its direct parent, and so on through Part 6. Each branch contains only its current and earlier lesson chapters; forward links go to the full textbook on `main`.

Run `node tools/verify-course.js` after creating the local branches and before pushing them. It checks each actual branch against the exported source, checks the direct ancestry, checks documentation links and JavaScript examples, and runs the stage-appropriate programs/tests. It uses main's installed dependencies unless you request fresh installs with `--install`. It does not publish or rewrite branches.
