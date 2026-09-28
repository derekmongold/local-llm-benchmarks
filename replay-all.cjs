'use strict';
// Replay archived synthetic candidates; no inference, packages or network calls.
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
try {
  const report = JSON.parse(fs.readFileSync(path.join(__dirname, 'results.json'), 'utf8'));
  let verified = 0;
  for (const attempt of report.attempts) {
    const candidate = path.join(__dirname, attempt.artifact_directory, 'candidate.js');
    for (const [filename, field] of [['public-verify.cjs', 'public_check'], ['verify.cjs', 'hidden_check']]) {
      const execution = spawnSync(process.execPath, ['--max-old-space-size=64', path.join(__dirname, 'replay', filename), attempt.case, candidate], {encoding: 'utf8', timeout: 5000});
      if (execution.error || execution.signal) throw new Error('Replay subprocess did not settle');
      const actual = JSON.parse(execution.stdout);
      const expected = attempt.acceptance[field];
      if (!expected || actual.passed !== expected.passed || actual.checks !== expected.checks || actual.stage !== expected.stage) throw new Error(`Acceptance mismatch: trial ${attempt.trial}, attempt ${attempt.attempt}, ${field}`);
      if (execution.status !== (actual.passed ? 0 : 2)) throw new Error('Verifier exit mismatch');
      verified++;
    }
  }
  console.log(JSON.stringify({verified, attempts: report.attempts.length, recorded_failures_preserved: true, inference_calls: 0}));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
