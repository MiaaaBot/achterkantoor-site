const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('oplossingen page exposes mount points for package rendering', () => {
  const html = fs.readFileSync('oplossingen/index.html', 'utf8');

  assert.match(html, /id="solutionsGrid"/);
  assert.match(html, /id="solutionWizard"/);
  assert.match(html, /type="module" src="\/assets\/solutions-page\.js"/);
});
