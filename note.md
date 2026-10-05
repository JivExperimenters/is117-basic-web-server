# Student walkthrough notes

Reviewed October 5, 2026. This is a simulated first-time student walkthrough by Codex, not feedback collected from enrolled students.

## How I worked

I read setup and the lessons in order, checked out and ran all six actual GitHub reference branches in a separate temporary clone, and built a second project from an empty folder using the lesson commands and code blocks. I kept the student project separate from the reference answers. I tested real HTTP responses and Jest output. Environment: macOS, Node v24.20.0, npm 11.19.0. Windows/PowerShell and browser developer-tool interactions were reviewed in text, not exercised on a Windows computer or browser UI. Existing Node/Git installations were used; installer onboarding was not tested.

Baseline main: `26f5295`. Reference commits, in order: `2227699`, `f4e85bf`, `54cb180`, `ce30ea6`, `d930adf`, `7cc47f1`.

## Before starting

**N1 — What am I supposed to hand in?** The README calls this a textbook and gives checkpoints, but never defines assignment evidence or a final hand-in. I can copy every example and still not know what counts as my completed work. Improvement: add an assignment checklist with a small record of predictions, observations, and explanations for each part; distinguish required work from the optional fourth test. Let the instructor specify submission destination and grading policy.

**N2 — Am I building or switching branches?** Setup already explains separate student/reference folders well. Branch README commands nevertheless run finished answers, which can look like completing the assignment. Improvement: make each README point to the assignment checklist and explicitly say that running reference code is for comparison; progress comes from building and explaining the student project.

## Part 1 — learn/01-node-and-terminal

Observed: `node index.js` printed the stated greeting and exited. The student variation printed two lines in order; restoring the example worked.

**N3 — How do I show I learned it?** The completion check is useful, but does not say what to save before restoring the practice change. Improvement: add a short evidence prompt and an explicit list of expected files, carried through all six parts.

## Part 2 — learn/02-npm-project

Observed: a fresh `npm init -y`, script changes, `npm install`, and `npm start` worked. The student name was `is117-web-server`; the reference name was `is117-basic-web-server`, as the lesson explains.

**N4 — Can I paste the displayed JSON as my entire file?** The isolated `"name"` and `"scripts"` examples are fragments. Part 5 warns about this; Part 2 does not say it as directly. Improvement: label these as fragments and recommend using the supplied npm commands while keeping the outer object and other settings.

## Part 3 — learn/03-first-server

Observed: both projects returned the exact home body with status 200. The server stayed alive until stopped. Fresh installation selected Express 5.2.1.

**N5 — Which Express version does the lesson teach?** `npm install express` selects whatever major version is latest later. The listening callback's error behavior is tied to Express 5. Improvement: teach `npm install express@5` and explain that the major version is deliberate; retain `npm ci` for exact reference installs. Likewise use `jest@30` in Part 5. Patch/minor versions and lockfile lengths can differ.

**N6 — Is “working fantastic” something technical?** This awkward wording repeats in source, expected results, and assertions. It is not a runtime defect, but beginners need an unambiguous shared string. Improvement: use `Hello, IS117! Your web server is working.` everywhere, retaining exact matching as the learning objective.

## Part 4 — learn/04-routes-and-status

Observed: `/` and `/about` returned 200; both `/missing` and `/missing-page` returned 404 with `Page not found.`. A practice `/hello` route above the final handler returned 200.

**N7 — Why does the missing URL change?** Part 4 and branch READMEs use `/missing`; Part 6 and tests use `/missing-page`. Both work, but a new student might add a dedicated route or assume a typo. Improvement: standardize on `/missing-page`; explain that any unmatched path reaches the final handler. Keep an explicit reminder about favicon and cache statuses, which the existing lesson already handles well.

## Part 5 — learn/05-first-test

Observed: one test passed in both projects. Changing only the expected status to 404 produced exactly one failure; restoring 200 returned to green. Fresh installation selected Jest 30.5.2.

**N8 — Do I have to invent all this async code?** The lesson describes scaffolding, but the long Promise/event/cleanup explanation can obscure the small task: check a status and a body. Improvement: identify what students copy unchanged and what they should be able to write, show the expected folder tree, and place the detailed setup explanation behind a clearly labeled optional deeper-reading section. Keep the full example available.

**N9 — Did npm installation fail?** Installs printed a transitive `glob` deprecation warning; this npm version also reported packages with install scripts awaiting approval. Installs and tests completed successfully in this environment. Improvement: explain the distinction between a warning and a failed command, ask students to check that the prompt returned and the checkpoint works, and provide a help path for errors or blocked managed machines. Do not ask beginners to approve unfamiliar scripts or run forced dependency upgrades just to match output.

## Part 6 — learn/06-complete-tests

Observed: three tests passed. A wrong missing-page status produced one failed/two passed tests; a wrong home body did the same. Restoring the server gave three passes. The optional `/hello` route and matching test gave four passes.

**N10 — Should my final result have three or four tests?** The optional extension is labeled in the lesson, but a submission checklist should make the required final state explicit. Improvement: require three baseline passing tests; accept four when the optional extension is documented. Save failure observations before restoring the intentional bugs, and do not submit a deliberately broken final server.

## Maintenance consistency

**N11 — Will the branches get the improved instructions?** The repository generates branch READMEs and snapshots from `tools/course-stages.js`. Editing only main's README leaves learners on old branch docs. Improvement: update the generator, include the assignment guide in each snapshot, regenerate all six local learning branches, and verify their actual files and sequential ancestry. Preserve the fetched GitHub references for comparison; do not publish changed branches without a separate publishing request.

**N12 — Is the export command portable?** Instructor examples use `/private/tmp`, a macOS-style location despite supporting Windows and Linux students. Improvement: use a new sibling folder such as `../is117-lessons`, which works with the existing export tool on supported systems.

## What already works well

The separate folders, save/restart reminders, status/body distinction, exact assertions, independent test server, deliberate bug exercises, and real-branch verifier are useful. No baseline application or checkpoint test failures were found. The changes address clarity and consistency rather than inventing a broken runtime.

## Validation and resolution

Before edits, `node tools/verify-course.js --remote --install` passed all six fetched branches, including fresh locked installs. The independent student walkthrough also exercised the from-scratch path, deliberate failures, restoration, and optional fourth test. The final validation results and file mapping will be added after the improvements are complete.

### Applied improvements

| Notes | Changed files |
| --- | --- |
| N1–N3, N10 | [Assignment checklist](docs/assignment.md), [setup](docs/setup.md), all six lessons, README, instructor guide, generated branch READMEs |
| N4 | [Part 2](docs/lessons/02-npm-project.md): explicitly labeled JSON fragments |
| N5 | [Part 3](docs/lessons/03-first-server.md) and [Part 5](docs/lessons/05-first-test.md): Express 5/Jest 30 install commands and version explanations |
| N6–N7 | Shared greeting corrected across source, tests, lessons, README; unknown path standardized across instructions and generated READMEs |
| N8 | Part 5: file tree, clear scaffolding boundary, short async explanation, optional deeper setup explanation |
| N9 | [Troubleshooting](docs/troubleshooting.md): interpreting observed npm warnings and errors |
| N11–N12 | Snapshot generator (`tools/course-stages.js`), branch/instructor guides: include assignment guide, update every local branch, portable export destination |

### Final results

- `node tools/verify-course.js --install`: all six **revised local branch trees** passed file matching, links, JavaScript examples, cumulative ancestry, fresh locked installs, HTTP status/body checks, and stage-appropriate tests.
- `npm test` in the revised main working copy: one suite, three passing tests.
- Repeated the independent student build using the revised lesson snippets and `express@5`/`jest@30`: all six parts worked. Real HTTP status/body assertions passed. The deliberate incorrect assertion failed once; each deliberate server bug failed one of three tests; restoring the server passed all three; the optional greeting extension passed all four.
- The independent walkthrough also cloned and ran the six revised local learning branches. Revised commits: `d7930dc`, `1d0a5e6`, `e671d37`, `8fad329`, `d19cbc3`, `31204b1`.
- `git diff --check` passed. No application dependencies were added and the lockfile stayed unchanged.

The revised learning branches were created locally with cumulative first-parent ancestry and the original checkpoint commits retained as ancestors. Original fetched `origin/learn/...` refs remain unchanged. The review and canonical improvements live on `codex/student-walkthrough`. No changes were pushed to GitHub. The Windows installation/PowerShell and browser UI limitations above remain; runtime success on macOS does not resolve those untested paths. A classroom pilot can now collect actual student confusion using the same learning record.
