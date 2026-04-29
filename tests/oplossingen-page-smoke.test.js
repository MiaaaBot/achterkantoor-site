const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('oplossingen page exposes mount points for package rendering', () => {
  const html = fs.readFileSync('oplossingen/index.html', 'utf8');

  assert.match(html, /id="solutionsGrid"/);
  assert.match(html, /id="demoPanels"/);
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

test('oplossingen page ships fallback catalog and demo content in the HTML shell', () => {
  const html = fs.readFileSync('oplossingen/index.html', 'utf8');

  assert.match(html, /<div id="solutionsGrid" class="solutions-grid">[\s\S]*data-solution-card="ontbrekende-stukken"/);
  assert.match(html, /<div id="demoPanels" class="demo-panels">[\s\S]*data-demo-slug="ontbrekende-stukken"/);
});

test('solutions page JS keeps CTA hooks on rendered cards and avoids hidden injected panels', () => {
  const script = fs.readFileSync('assets/solutions-page.js', 'utf8');

  assert.match(script, /data-solution-action="buy"/);
  assert.match(script, /data-solution-action="demo"/);
  assert.match(script, /data-package-slug="\$\{item\.slug\}"/);
  assert.doesNotMatch(script, /class="solution-card reveal"/);
  assert.doesNotMatch(script, /class="demo-card reveal"/);
});

test('solutions page JS includes submit locking and focus management hooks', () => {
  const script = fs.readFileSync('assets/solutions-page.js', 'utf8');

  assert.match(script, /let wizardSubmitPending = false/);
  assert.match(script, /if \(wizardSubmitPending\) return;/);
  assert.match(script, /function focusWizardStep/);
});
