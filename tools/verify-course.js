// Instructor checks: documents, real branch trees, ancestry, and runnable examples.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const net = require('node:net');
const { spawn, spawnSync } = require('node:child_process');
const { ROOT, REPO_URL, PARTS, stageFiles, writeFiles } = require('./course-stages');

const args = new Set(process.argv.slice(2));
for (const arg of args) {
  if (!['--install', '--snapshots-only', '--remote'].includes(arg)) {
    throw new Error(`Unknown option: ${arg}`);
  }
}
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function command(executable, commandArgs, cwd = ROOT) {
  const result = spawnSync(executable, commandArgs, {
    cwd, encoding: 'utf8', timeout: 180000,
    shell: process.platform === 'win32' && executable === npm,
  });
  if (result.error || result.status !== 0) {
    throw new Error(`${executable} ${commandArgs.join(' ')} failed:\n${result.error || ''}\n${result.stdout}\n${result.stderr}`);
  }
  return result.stdout;
}

function git(...commandArgs) {
  return command('git', commandArgs).trim();
}

function resolveBranch(branch) {
  const candidates = args.has('--remote') ? [`origin/${branch}`] : [branch, `origin/${branch}`];
  for (const candidate of candidates) {
    const result = spawnSync('git', ['rev-parse', '--verify', candidate], { cwd: ROOT, encoding: 'utf8' });
    if (result.status === 0) return candidate;
  }
  throw new Error(`Missing branch ${branch}; fetch origin or create the lesson branches first.`);
}

function collectDocuments(directory, relative = '') {
  const files = {};
  for (const entry of fs.readdirSync(path.join(directory, relative), { withFileTypes: true })) {
    if (['node_modules', '.git', 'tools'].includes(entry.name)) continue;
    const name = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) Object.assign(files, collectDocuments(directory, name));
    else if (entry.name.endsWith('.md')) files[name] = fs.readFileSync(path.join(directory, name), 'utf8');
  }
  return files;
}

function checkDocuments(files, mainFiles, label) {
  for (const [name, contents] of Object.entries(files)) {
    if (!name.endsWith('.md')) continue;
    for (const match of contents.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1].split('#')[0];
      if (!target || target.startsWith('mailto:')) continue;
      if (/^https?:/.test(target)) {
        // Check links into this repository's main textbook as well as local links.
        const mainPrefix = `${REPO_URL}/blob/main/`;
        if (target.startsWith(mainPrefix)) {
          assert.ok(mainFiles[target.slice(mainPrefix.length)], `${label}: missing main link in ${name}: ${target}`);
        }
        continue;
      }
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(name), target));
      assert.ok(Object.hasOwn(files, resolved), `${label}: broken link in ${name}: ${target}`);
    }
    for (const match of contents.matchAll(/```(?:js|javascript)\r?\n([\s\S]*?)```/g)) {
      new vm.Script(match[1], { filename: `${label}:${name}` });
    }
  }
}

function checkPackage(files, part) {
  if (part.number === 1) {
    assert.equal(files['package.json'], undefined);
    assert.equal(files['tests/server.test.js'], undefined);
    return;
  }
  const pkg = JSON.parse(files['package.json']);
  const lock = JSON.parse(files['package-lock.json']);
  assert.equal(pkg.name, lock.name);
  assert.equal(pkg.name, lock.packages[''].name);
  assert.equal(pkg.scripts.start, 'node index.js');
  assert.deepEqual(pkg.dependencies, lock.packages[''].dependencies);
  assert.deepEqual(pkg.devDependencies, lock.packages[''].devDependencies);
  assert.equal(Boolean(pkg.dependencies?.express), part.number >= 3);
  assert.equal(Boolean(pkg.devDependencies?.jest), part.number >= 5);
  assert.equal(Boolean(files['tests/server.test.js']), part.number >= 5);
  if (part.number >= 5) {
    assert.equal(pkg.scripts.test, 'jest --runInBand');
    assert.equal(lock.packages['node_modules/jest'].dev, true);
  } else {
    assert.equal(pkg.scripts.test, undefined);
    assert.equal(lock.packages['node_modules/jest'], undefined);
  }
}

function checkTestExamples() {
  const finalIndex = fs.readFileSync(path.join(ROOT, 'index.js'), 'utf8');
  const finalTests = fs.readFileSync(path.join(ROOT, 'tests/server.test.js'), 'utf8');
  const firstTestLesson = fs.readFileSync(path.join(ROOT, PARTS[4].lesson), 'utf8');
  const lastTestLesson = fs.readFileSync(path.join(ROOT, PARTS[5].lesson), 'utf8');
  const firstBlocks = [...firstTestLesson.matchAll(/```(?:js|javascript)\r?\n([\s\S]*?)```/g)];
  const lastBlocks = [...lastTestLesson.matchAll(/```(?:js|javascript)\r?\n([\s\S]*?)```/g)];
  const guardStart = finalIndex.indexOf('// Start listening only');
  const aboutTest = finalTests.indexOf("test('the about page");
  assert.ok(guardStart >= 0 && aboutTest >= 0, 'Canonical example markers are missing.');
  assert.equal(firstBlocks[0][1].trim(), finalIndex.slice(guardStart).trim(), 'Part 5 startup example differs from index.js');
  assert.equal(firstBlocks[1][1].trim(), finalTests.slice(0, aboutTest).trim(), 'Part 5 first test example is stale');
  assert.equal(lastBlocks[0][1].trim(), finalTests.slice(aboutTest).trim(), 'Part 6 added tests are stale');
}

async function checkHttpProgram(directory, part, homeBody) {
  // Test a temporary copy on an available port, leaving a student's port 3000 free.
  const port = await new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const available = probe.address().port;
      probe.close(() => resolve(available));
    });
  });
  const indexPath = path.join(directory, 'index.js');
  const originalIndex = fs.readFileSync(indexPath, 'utf8');
  assert.ok(originalIndex.includes('const port = 3000;'), 'The classroom example must use port 3000.');
  fs.writeFileSync(indexPath, originalIndex.replace('const port = 3000;', `const port = ${port};`));
  const child = spawn(process.execPath, ['index.js'], { cwd: directory, stdio: ['ignore', 'pipe', 'pipe'] });
  let log = '';
  let errors = '';
  child.stdout.on('data', (data) => { log += data.toString(); });
  child.stderr.on('data', (data) => { errors += data.toString(); });
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Server did not start: ${log}\n${errors}`)), 5000);
      child.stdout.on('data', () => {
        if (log.includes(`Server running at http://localhost:${port}`)) {
          clearTimeout(timer);
          resolve();
        }
      });
      child.once('error', (error) => { clearTimeout(timer); reject(error); });
      child.once('exit', (code) => { clearTimeout(timer); reject(new Error(`Server exited (${code}): ${errors}`)); });
    });
    const cases = [{ url: '/', status: 200, text: homeBody }];
    if (part.number >= 4) {
      cases.push({ url: '/about', status: 200, text: 'A web server receives a request and sends a response.' });
      cases.push({ url: '/missing-page', status: 404, text: 'Page not found.' });
    } else {
      cases.push({ url: '/missing-page', status: 404 });
    }
    for (const expected of cases) {
      const response = await fetch(`http://localhost:${port}${expected.url}`, { signal: AbortSignal.timeout(5000) });
      assert.equal(response.status, expected.status);
      const text = await response.text();
      if (expected.text) assert.equal(text, expected.text);
    }
    if (part.number === 3) {
      // A second copy must report the occupied port rather than claim success.
      const duplicate = spawnSync(process.execPath, ['index.js'], { cwd: directory, encoding: 'utf8', timeout: 5000 });
      assert.equal(duplicate.status, 1);
      assert.ok(duplicate.stderr.includes('EADDRINUSE'));
      assert.ok(!duplicate.stdout.includes('Server running'));
    }
  } finally {
    if (child.exitCode === null && child.signalCode === null) {
      const stopped = new Promise((resolve) => child.once('exit', resolve));
      child.kill('SIGTERM');
      await stopped;
    }
    fs.writeFileSync(indexPath, originalIndex);
  }
}

async function main() {
  const mainDocuments = collectDocuments(ROOT);
  checkDocuments(mainDocuments, mainDocuments, 'main');
  checkTestExamples();
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'is117-course-check-'));
  let previousCommit;
  const homeBody = fs.readFileSync(path.join(ROOT, 'index.js'), 'utf8').match(/res\.send\('([^']+)'\)/)[1];
  try {
    for (const part of PARTS) {
      const files = stageFiles(part);
      checkDocuments(files, mainDocuments, part.branch);
      checkPackage(files, part);
      if (!args.has('--snapshots-only')) {
        const ref = resolveBranch(part.branch);
        const names = git('ls-tree', '-r', '--name-only', ref).split('\n').sort();
        assert.deepEqual(names, Object.keys(files).sort(), `Unexpected files on ${ref}`);
        for (const [name, contents] of Object.entries(files)) {
          const actual = command('git', ['show', `${ref}:${name}`]);
          assert.equal(actual, contents, `Stale file on ${ref}: ${name}`);
        }
        const lineage = git('rev-list', '--parents', '-n', '1', ref).split(' ');
        if (previousCommit) assert.equal(lineage[1], previousCommit, `Part ${part.number} must directly follow the preceding part`);
        previousCommit = lineage[0];
      }
      const directory = path.join(temporary, part.slug);
      writeFiles(directory, files);
      command(process.execPath, ['--check', 'index.js'], directory);
      if (part.number >= 2 && args.has('--install')) {
        command(npm, ['ci', '--ignore-scripts', '--no-audit', '--no-fund', '--prefer-offline', '--cache', path.join(temporary, 'npm-cache')], directory);
      } else if (part.number >= 3) {
        assert.ok(fs.existsSync(path.join(ROOT, 'node_modules/express')), 'Run npm ci in main before checking the course.');
        fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(directory, 'node_modules'), 'junction');
      }
      if (part.number <= 2) {
        const output = part.number === 1
          ? command(process.execPath, ['index.js'], directory)
          : command(npm, ['start'], directory);
        assert.ok(output.includes('Hello, IS117! Node.js is running.'));
      } else {
        await checkHttpProgram(directory, part, homeBody);
        if (part.number >= 5) {
          const reportPath = path.join(directory, 'test-report.json');
          command(npm, ['test', '--', '--json', '--outputFile', reportPath], directory);
          const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
          assert.equal(report.numPassedTests, part.number === 5 ? 1 : 3);
          assert.equal(report.numFailedTests, 0);
        }
      }
      console.log(`PASS ${part.branch}: files, lessons, dependencies, and program${part.number >= 5 ? '/tests' : ''}`);
    }
    console.log('All six course checkpoints verified.');
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
