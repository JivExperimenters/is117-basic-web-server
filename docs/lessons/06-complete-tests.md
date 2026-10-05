# Part 6: Check Every Response and Catch a Bug

[Course home](../../README.md) · [Setup help](../setup.md) · [Branch guide](../branches.md) · [Glossary](../glossary.md)

Previous: [Part 5 — The first test](https://github.com/kaw393939/is117-basic-web-server/blob/main/docs/lessons/05-first-test.md)

## What you will build

In Part 5, you checked the home page with Jest. Now you will check the about page and a missing page. Then you will make a small, deliberate mistake and see whether the tests detect it.

The completed project has one server file, one test file, Express as a dependency, and Jest as a development dependency. It is still the small server you built; we are adding ways to check its behavior.

Keep working in your own `is117-web-server` folder. The branch `learn/06-complete-tests` is the finished reference. The [branch guide](../branches.md) explains how to compare it in a separate `is117-reference` folder.

## Checkpoint 1: Describe the behavior before writing a test

A useful test starts with a clear expectation. Recall these three requests:

| Request path | Expected status | Expected response body |
| --- | --- | --- |
| `/` | `200` | `Hello, IS117! Your web server is working.` |
| `/about` | `200` | `A web server receives a request and sends a response.` |
| `/missing-page` | `404` | `Page not found.` |

The **path** selects which part of the server we request. A **status code** gives the result a meaning that programs can read: `200` means success, and `404` means the requested page was not found. The **response body** is the text the server sends back.

Inside our routes, `req` holds the incoming request and `res` lets us create the response. `res.send(...)` sends our text. Express uses status `200` by default for these successful responses. Our final handler calls `res.status(404)` before sending the missing-page message.

We check the status and the body separately. A server could send the right words with the wrong status, or send the right status with the wrong words. Either difference matters to the behavior we promised.

**Check:** Without running anything, predict the status and text for `/about` and `/missing-page`.

## Checkpoint 2: Add two tests

Open `tests/server.test.js`. Keep the app import, variables, `beforeAll`, `afterAll`, and home-page test from Part 5. Add these two tests below the home-page test:

```javascript
test('the about page explains what a web server does', async () => {
  const response = await fetch(`${baseUrl}/about`);

  expect(response.status).toBe(200);
  expect(await response.text()).toBe('A web server receives a request and sends a response.');
});

test('a missing page sends a 404 response', async () => {
  const response = await fetch(`${baseUrl}/missing-page`);

  expect(response.status).toBe(404);
  expect(await response.text()).toBe('Page not found.');
});
```

Read each test aloud. Its first line describes a behavior. Its `fetch` line asks the server for a path. Its assertions check the result. The same pattern lets us check different pages without rewriting the setup.

The tests share a server prepared by `beforeAll`, but each makes its own request and declares its own expectations. The about-page test does not need the home-page test to run first. The missing-page test does not rely on something the about-page test changed. These are independent checks of our server's responses.

There is no `/missing-page` route in `index.js`. That is intentional. Express tries the registered routes in order; when none matches, the final `app.use(...)` handler responds. A request for `/missing-page` exercises that handler.

Save the file and run:

```bash
npm test
```

Expect **one passing test suite** and **three passing tests**. A typical summary includes:

```text
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

Jest may include colors, timing, and the three test names. Those details can vary. The counts and whether the tests pass are your checkpoint.

## Checkpoint 3: Find an incorrect status

Testing is easier to understand when you see a failure. Make this temporary change in the final handler in `index.js`:

```javascript
res.status(200);
```

You are replacing `res.status(404)` for this experiment. Leave the response text as `Page not found.` Save the file and run `npm test` again.

The missing-page test should fail. The home-page and about-page tests should still pass. Jest should show that the test **expected** `404` but **received** `200`.

The test has located a specific disagreement: our missing-page response reports success. The response text alone could look fine in a browser, but the status is wrong. This is why the assertion checks the status separately.

Restore `res.status(404)`, save, and run `npm test` again. All three tests should pass. Do not continue with the deliberate mistake still in your file.

**Check:** Why did the missing-page test fail even though the text did not change?

## Checkpoint 4: Find incorrect text

Now temporarily change only the home-page response in `index.js` to:

```javascript
res.send('Hello!');
```

Save and run `npm test`. This time, the home-page test should fail while the other two pass. Its status assertion still passes; its text assertion fails. Jest shows the longer expected greeting and the shorter received greeting.

Read a failure report from the test name to the assertion, then compare **Expected** and **Received**. A red result tells you which expectation was not met. It is information you can use to fix a problem, not a judgment about your ability.

Restore the original response exactly:

```javascript
res.send('Hello, IS117! Your web server is working.');
```

Save and run `npm test`. Confirm all three tests pass again.

If you intentionally change the server's promised behavior later, reconsider its test too. For these experiments, the promise stayed the same, so we corrected the server rather than weakening the assertions.

## Checkpoint 5: Compare manual and automated checks

Run `npm start` and visit the home page, `/about`, and `/missing-page` in your browser. Stop the server with **Ctrl+C** when finished. Then run `npm test` independently.

A **manual check** helps you see the program as a person using it. An **automated check** repeats specific expectations whenever you run it. Both are useful. Our tests send real HTTP requests, read real responses, and check the three behaviors listed above.

Three passing tests do not prove every possible behavior is correct. They do not check every address, every computer, or what happens if a program crashes. They give evidence that these three requests receive their expected status and text. As a project gains behavior, its tests should grow to cover that behavior.

## Try it yourself: Add a greeting

Add a `GET /hello` route in `index.js`, above the final missing-page handler. Have it send exactly `Hello, student!` with the default success status.

Then add a fourth test to `tests/server.test.js`. Give it a readable name, request `${baseUrl}/hello`, and check status `200` and body `Hello, student!`. Use the earlier tests as your pattern; you do not need new setup or another package.

Run `npm test`. Expect four passing tests. Restart `npm start` if needed and visit `/hello` in your browser. If the new test receives `404`, check the route's spelling and position: a route placed after the final missing-page handler cannot respond to that request.

This exercise is an optional extension. The reference branch keeps the original three responses and three tests so you can compare your course work with the same finished example.

## What you can now explain

You started with a JavaScript file that Node could run. You used npm to describe the project and install packages. Express turned your program into a server that listens for requests, selects routes, and sends responses. Jest checked those responses automatically.

Before you finish, explain the trip from a client request to a server response, why the server keeps running after `npm start`, why Jest is a development dependency, and how a failed assertion helped you find a mistake.

## Save your checkpoint evidence

Record the three-test passing summary and the Expected/Received values from both deliberate server bugs. Restore the server and rerun before submitting. Three passing tests complete the required work; the optional `/hello` extension gives four. Use the [final hand-in checklist](../assignment.md#final-hand-in). See the [assignment checklist](../assignment.md) for the full learning record.

[Return to the course home](../../README.md)
