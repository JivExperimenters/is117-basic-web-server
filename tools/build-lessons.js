// This export tool creates reviewable folders. It never changes Git branches.
const fs = require('node:fs');
const path = require('node:path');
const { ROOT, PARTS, stageFiles, writeFiles } = require('./course-stages');

const args = process.argv.slice(2);
if (args.length !== 2 || args[0] !== '--output') {
  console.error('Usage: node tools/build-lessons.js --output <new-folder>');
  process.exit(1);
}
const output = path.resolve(args[1]);
if (output === ROOT || output.startsWith(ROOT + path.sep)) {
  throw new Error('Choose an output folder outside the project.');
}
if (fs.existsSync(output) && fs.readdirSync(output).length !== 0) {
  throw new Error('Output must be a new or empty folder; existing files are preserved.');
}
// Prepare every snapshot first, so a missing lesson does not leave a partial export.
const snapshots = PARTS.map((part) => ({ part, files: stageFiles(part) }));
for (const { part, files } of snapshots) {
  writeFiles(path.join(output, part.slug), files);
  console.log(`Exported ${part.branch}`);
}
