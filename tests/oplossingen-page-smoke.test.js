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

test('oplossingen page contains task 2 conversion sections', () => {
  const html = fs.readFileSync('oplossingen/index.html', 'utf8');

  assert.match(html, /<section[^>]+class="solutions-catalog section tint-sand"/);
  assert.match(html, /<section[^>]+id="demoSection"[^>]*class="section section-accent"/);
  assert.match(html, /<section[^>]+id="privacySection"[^>]*class="section"/);
  assert.match(html, /<section[^>]+id="dashboardPreview"[^>]*class="section tint-sky"/);
});

test('oplossingen page uses oplossingen-scoped section card wrappers', () => {
  const html = fs.readFileSync('oplossingen/index.html', 'utf8');

  const scopedCards = html.match(/class="solutions-section-card reveal"/g) || [];
  assert.equal(scopedCards.length, 2);
  assert.doesNotMatch(html, /class="section-card reveal"/);
});

test('oplossingen page reveal script observes new reveal targets', () => {
  const html = fs.readFileSync('oplossingen/index.html', 'utf8');

  assert.match(html, /class="solutions-hero-copy reveal"/);
  assert.match(html, /class="container privacy-grid reveal"/);
  assert.match(html, /querySelectorAll\('\.reveal,? ?\.fade-in'\)/);
});
