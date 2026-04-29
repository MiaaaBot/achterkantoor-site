const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('oplossingen page exposes mount points for package rendering', () => {
  const html = fs.readFileSync('oplossingen/index.html', 'utf8');

  assert.match(html, /id="solutionsGrid"/);
  assert.match(html, /id="solutionWizard"/);
  assert.match(html, /id="solutionWizardForm"/);
  assert.match(html, /id="wizardBody"/);
  assert.match(html, /type="module" src="\/assets\/solutions-page\.js"/);
  assert.equal(fs.existsSync('assets/solutions-page.js'), true);
});

test('oplossingen page contains wizard and product CTA hooks', () => {
  const html = fs.readFileSync('oplossingen/index.html', 'utf8');

  assert.match(html, /id="wizardBody"/);
  assert.match(html, /data-solution-action="buy"/);
  assert.match(html, /data-solution-action="demo"/);
});

test('oplossingen page includes product conversion and trust sections', () => {
  const html = fs.readFileSync('oplossingen/index.html', 'utf8');

  assert.match(html, /id="demoSection"/);
  assert.match(html, /id="privacySection"/);
  assert.match(html, /id="dashboardPreview"/);
  assert.match(html, /"@type": "FAQPage"/);
});

test('oplossingen page reveal script observes new reveal targets', () => {
  const html = fs.readFileSync('oplossingen/index.html', 'utf8');

  assert.match(html, /class="solutions-hero-copy reveal"/);
  assert.match(html, /class="container privacy-grid reveal"/);
  assert.match(html, /querySelectorAll\('\.reveal,? ?\.fade-in'\)/);
});
