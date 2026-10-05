// Instructor tooling: prepare completed lesson files without changing Git.
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const REPO_URL = 'https://github.com/kaw393939/is117-basic-web-server';
const PARTS = [
  { number: 1, slug: '01-node-and-terminal', title: 'Node and the terminal', checkpoint: 'Print a message with node index.js.' },
  { number: 2, slug: '02-npm-project', title: 'An npm project', checkpoint: 'Run the same program with npm start.' },
  { number: 3, slug: '03-first-server', title: 'Your first web server', checkpoint: 'See the home page at http://localhost:3000/.' },
  { number: 4, slug: '04-routes-and-status', title: 'Routes and status codes', checkpoint: 'Check two successful pages and a missing page with status 404.' },
  { number: 5, slug: '05-first-test', title: 'Your first automated test', checkpoint: 'Run one passing HTTP test with npm test.' },
  { number: 6, slug: '06-complete-tests', title: 'Complete the tests', checkpoint: 'Run three passing HTTP tests and explain a deliberate failure.' },
].map((part) => ({ ...part, branch: `learn/${part.slug}`, lesson: `docs/lessons/${part.slug}.md` }));

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function firstJavaScriptExample(lesson) {
  const match = read(lesson).match(/```(?:js|javascript)\r?\n([\s\S]*?)```/);
  if (!match) throw new Error(`No worked JavaScript example in ${lesson}`);
  return match[1].trimEnd() + '\n';
}

function branchReadme(part) {
  const commands = part.number === 1
    ? ['node index.js']
    : ['npm ci', ...(part.number >= 5 ? ['npm test'] : []), 'npm start'];
  const result = part.number <= 2
    ? '`Hello, IS117! Node.js is running.` prints in the terminal, then the program finishes.'
    : 'The server prints `Server running at http://localhost:3000`. Keep it running while visiting that address in your browser. Press **Ctrl+C** in the terminal to stop it.';
  const testNote = part.number >= 5
    ? `\nExpect **${part.number === 5 ? 'one passing test' : 'three passing tests'}** from \`npm test\`. Tests start and stop their own server, so \`npm start\` does not need to be running first.\n`
    : '\nThere are no Jest tests at this checkpoint; testing begins in Part 5.\n';
  const priorLessons = PARTS.filter((entry) => entry.number <= part.number)
    .map((entry) => `- [Part ${entry.number}: ${entry.title}](${entry.lesson})`).join('\n');
  const next = PARTS.find((entry) => entry.number === part.number + 1);
  return `# Part ${part.number}: ${part.title}

This is the **completed worked example** for Part ${part.number} of IS117's first web server textbook. The current branch is \`${part.branch}\`.

**Checkpoint:** ${part.checkpoint}

## Read, then build

Start with [this part's lesson](${part.lesson}). It explains the commands, code, expected output, and practice steps. Build the lesson in your own \`is117-web-server\` folder; use this separate \`is117-reference\` clone to compare completed work.

${part.number === 1 ? 'Begin with Node.js, npm, an editor, and a terminal. This branch has no npm project or web server yet.' : `Start your own work from Part ${part.number - 1}. This reference branch already includes earlier parts and this part's completed changes; do not run \`npm init\` again in the reference clone.`}

## Run this reference

Install the tools using [setup](docs/setup.md). Open a terminal in this repository folder, then run these commands one at a time:

\`\`\`bash
${commands.join('\n')}
\`\`\`

${part.number >= 2 ? '`npm ci` installs the versions in this branch\'s lockfile. Use it in the reference clone after switching branches; use `npm install` when building your own project and adding packages.\n\n' : ''}${result}
${testNote}
${part.number >= 4 ? 'Also visit `/about` for the server explanation and `/missing-page` for `Page not found.` with status `404`.\n' : ''}
## Read the parts completed so far

${priorLessons}

## Continue

${next ? `After completing the lesson and saving your work, read [Part ${next.number}](${REPO_URL}/blob/main/${next.lesson}). The next reference branch is [\`${next.branch}\`](${REPO_URL}/tree/${next.branch}). Stop any running server, check \`git status\`, and follow [branch navigation](docs/branches.md) before switching.` : `You have reached the final checkpoint. Try the optional route-and-test exercise in the lesson, or return to the [full textbook](${REPO_URL}).`}

[Setup](docs/setup.md) · [Branch navigation](docs/branches.md) · [Glossary](docs/glossary.md) · [Troubleshooting](docs/troubleshooting.md)
`;
}

function stageFiles(part) {
  const files = { 'README.md': branchReadme(part) };
  // Keep generated packages ignored even when revisiting Part 1 after Part 6.
  // Students create their own .gitignore as part of the Part 2 lesson.
  files['.gitignore'] = read('.gitignore');
  for (const guide of ['setup', 'branches', 'glossary', 'troubleshooting', 'assignment']) {
    files[`docs/${guide}.md`] = read(`docs/${guide}.md`);
  }
  for (const entry of PARTS.filter((entry) => entry.number <= part.number)) {
    files[entry.lesson] = read(entry.lesson);
  }

  if (part.number <= 2) {
    files['index.js'] = firstJavaScriptExample(PARTS[0].lesson);
  } else if (part.number <= 4) {
    // Use the exact complete example students read in these two chapters.
    files['index.js'] = firstJavaScriptExample(part.lesson);
  } else {
    files['index.js'] = read('index.js');
  }

  if (part.number >= 2) {
    const pkg = JSON.parse(read('package.json'));
    if (part.number < 3) delete pkg.dependencies;
    if (part.number < 5) {
      delete pkg.devDependencies;
      delete pkg.scripts.test;
    }
    files['package.json'] = JSON.stringify(pkg, null, 2) + '\n';

    const lock = JSON.parse(read('package-lock.json'));
    if (part.number < 3) {
      lock.packages = { '': lock.packages[''] };
      delete lock.packages[''].dependencies;
    } else if (part.number < 5) {
      // npm marks packages used only by Jest as dev dependencies.
      lock.packages = Object.fromEntries(Object.entries(lock.packages)
        .filter(([name, entry]) => name === '' || !entry.dev));
    }
    if (part.number < 5) delete lock.packages[''].devDependencies;
    files['package-lock.json'] = JSON.stringify(lock, null, 2) + '\n';
  }

  if (part.number >= 5) {
    const tests = read('tests/server.test.js');
    const aboutTest = tests.indexOf("test('the about page");
    if (aboutTest < 0) throw new Error('Cannot locate the about-page test.');
    files['tests/server.test.js'] = part.number === 5
      ? tests.slice(0, aboutTest).trimEnd() + '\n'
      : tests;
  }
  return files;
}

function writeFiles(destination, files) {
  for (const [relativePath, contents] of Object.entries(files)) {
    const target = path.join(destination, relativePath);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, contents);
  }
}

module.exports = { ROOT, REPO_URL, PARTS, stageFiles, writeFiles };
