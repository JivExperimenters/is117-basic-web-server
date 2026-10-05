# Assignment: build and explain your first web server

[Course home](../README.md) · [Setup](setup.md) · [Branch navigation](branches.md)

Build all six lessons in one student folder named `is117-web-server`. Use the six completed `learn/...` branches to compare your work. Each branch is an answer checkpoint; switching to it and running it does not replace building your own project.

## Your learning record

Create a plain-text Markdown file named `learning-log.md` in your student folder. Markdown is ordinary text with simple formatting; `#` starts a heading. This is your own learning record, separate from the maintainer's `note.md` review.

For each part, record:

1. **Prediction:** what you think the next command or request will do, written before running it.
2. **Observation:** the command or URL, the actual output, and whether it matched. Copy relevant terminal text; for browser checks, record the body and the Network panel's document status. Screenshots are optional unless your instructor requests them.
3. **Explanation:** two or three sentences answering the question below in your own words.
4. **Experiment:** what you changed, what happened, and how you restored the shared example. Capture deliberate test failures before fixing them.

Use six headings, `## Part 1` through `## Part 6`. Add any unresolved questions and the error text when asking for help. Do not record credentials or unrelated personal information.

| Part | Evidence to keep | Question to explain |
| --- | --- | --- |
| 1 | Original greeting and two-line variation from `node index.js` | Where is code saved, what runs it, and where is output shown? |
| 2 | `npm start` output and the start script's value | How does npm know which program to run? |
| 3 | Startup message and home-page body | Why does the server keep running, and how do you see an edited response? |
| 4 | Status and body for `/`, `/about`, `/missing-page`; practice `/hello` result | Why does an unknown path reach the last handler? |
| 5 | One passing test; wrong expected-status failure; restored pass | Who starts the test server, and why check both status and body? |
| 6 | Three passing tests; wrong-status and wrong-body failures; restored pass | What do Expected and Received tell you, and which server line fixes each bug? |

For Parts 1–5, restore each practice variation as the lesson directs before continuing. In Part 6, restore the intentional bugs before handing in. The supplied Promise/event setup is scaffolding: understand its purpose, then focus on writing requests and assertions.

## Final hand-in

Use the destination and format your instructor announces. This repository does not specify a deadline, upload service, or grading weights.

Include your student project's:

- `index.js`
- `package.json` and `package-lock.json`
- `.gitignore`
- `tests/server.test.js`
- `learning-log.md`, covering all six parts

Exclude generated `node_modules`, logs, and the reference clone. Another person should be able to open your student project, run `npm ci`, then `npm test`, and see three passing baseline tests. They can run `npm start` to check the pages; stop that server with Ctrl+C afterward. The final test file keeps the home, about, and missing-page assertions, including the shared response text.

The optional Part 6 `/hello` route and fourth test may stay if you complete them. In that case, record the extension in your learning log and expect four passing tests. The original three tests must still pass. No extra package or separate test setup is needed.
