# Instructor Guide

[Course home](../README.md) · [Setup](setup.md) · [Branch guide](branches.md)

This course introduces a Node.js web server to college freshmen who have little programming experience. Keep the running program small. The lessons supply detailed explanations separately so students can revisit ideas without adding more code to `index.js`.

## Pace the six parts

Use one part per class session or learning block, with time to type commands, read output, and explain a checkpoint to a partner.

| Part and reference branch | Main checkpoint | Ask students |
| --- | --- | --- |
| 1 — `learn/01-node-and-terminal` | Run a JavaScript file with Node and return to the terminal prompt. | What is the difference between the terminal, Node, and your file? |
| 2 — `learn/02-npm-project` | Initialize the project and run the `start` script. | What command does `npm start` run? |
| 3 — `learn/03-first-server` | Open the home page while the server runs. | Why does the terminal not return to its prompt? |
| 4 — `learn/04-routes-and-status` | Request the about page and an unknown path. | How do the path, body, and status describe different things? |
| 5 — `learn/05-first-test` | Run one passing HTTP test without `npm start`. | Who starts and stops the test server? |
| 6 — `learn/06-complete-tests` | Run three tests and detect a deliberate bug. | What do Expected and Received tell you? |

Have students build in `is117-web-server`. A separate `is117-reference` clone contains completed checkpoints. Follow the branch guide before switching branches; reference files should support comparison without overwriting student work. `main` contains the complete program and textbook.

## Submission

Use the [submission checklist](assignment.md) for the final project files. Announce the submission destination and deadline; no separate learning log, screenshots, or written report are required by these lessons. The original three tests are required; the fourth `/hello` test is optional.

## Teach the supplied test setup

In Part 5, present `beforeAll` and `afterAll` as supplied infrastructure that starts, waits for, and closes the server. Students should understand why requests must wait and why cleanup matters. They do not need to invent Promise wrappers or event handlers in their first testing lesson.

Spend most practice time on readable test names, request paths, status codes, and response bodies. Ask students to predict a result before running a command. When a check fails, connect the message to one line of code and make one change at a time. The optional `/hello` exercise extends a familiar route-and-test pattern.

## Maintain the reference branches

Each learning branch is a cumulative, completed checkpoint. Keep earlier parts runnable at their taught stage and later concepts out of earlier code.

From `main`, export the six reference file trees with:

```bash
node tools/build-lessons.js --output ../is117-lessons
```

This writes files for review; it does not create commits or change Git branches. Use an empty output destination for a fresh export. Check local lesson branches, their ancestry and metadata, documentation, and runnable code with:

```bash
node tools/verify-course.js
```

Run verification after changing lesson text or checkpoint code. Keep the final project limited to Express, Jest, `index.js`, and its tests, with documentation and maintainer tools outside the student's server code.
