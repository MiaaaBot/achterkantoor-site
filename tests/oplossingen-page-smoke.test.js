const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

function extractJsonLdObjects(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
}

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
  assert.match(html, /<section[^>]+id="demoSection"[^>]*class="section solutions-proof-section"/);
  assert.match(html, /<section[^>]+id="startSection"[^>]*class="section solutions-start-section"/);
  assert.match(html, /<section[^>]+id="privacySection"[^>]*class="section"/);
  assert.match(html, /<section[^>]+id="finalCtaSection"[^>]*class="section solutions-final-cta-section"/);
});

test('oplossingen page uses oplossingen-scoped section card wrappers', () => {
  const html = fs.readFileSync('oplossingen/index.html', 'utf8');

  const scopedCards = html.match(/class="solutions-section-card reveal"/g) || [];
  assert.equal(scopedCards.length, 1);
  assert.match(html, /class="final-cta-card reveal"/);
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

  assert.match(html, /<div id="solutionsGrid" class="solutions-grid">[\s\S]*data-solution-card="ontbrekende-stukken"[\s\S]*Beste startpunt/);
  assert.match(html, /<div id="demoPanels" class="demo-panels">[\s\S]*data-demo-slug="ontbrekende-stukken"/);
});

test('oplossingen page ships product SEO metadata and direct-buy schema copy', () => {
  const html = fs.readFileSync('oplossingen/index.html', 'utf8');
  const jsonLdObjects = extractJsonLdObjects(html);
  const breadcrumbSchema = jsonLdObjects.find((item) => item['@type'] === 'BreadcrumbList');
  const faqSchema = jsonLdObjects.find((item) => item['@type'] === 'FAQPage');
  const faqAnswers = faqSchema?.mainEntity?.map((item) => item.acceptedAnswer?.text).join(' ') || '';

  assert.match(html, /<title>Koop vaste automatiseringen voor accountantskantoren \| AchterKantoor<\/title>/);
  assert.match(html, /<meta name="description" content="Bestel een vaste automatisering voor uw administratie- of accountantskantoor met duidelijke scope, vaste prijzen en een scope wizard voor de laatste check\."\s*\/?>/);
  assert.match(html, /<meta property="og:title" content="Koop vaste automatiseringen voor accountantskantoren \| AchterKantoor"\s*\/?>/);
  assert.match(html, /<meta property="og:description" content="Kies een oplossing, rond de scope wizard af en koop een vaste automatisering met privacy- en implementatieafspraken vooraf\."\s*\/?>/);
  assert.match(html, /<meta name="twitter:title" content="Koop vaste automatiseringen voor accountantskantoren \| AchterKantoor"\s*\/?>/);
  assert.match(html, /<meta name="twitter:description" content="Kies een oplossing, rond de scope wizard af en koop een vaste automatisering met privacy- en implementatieafspraken vooraf\."\s*\/?>/);
  assert.ok(breadcrumbSchema, 'expected breadcrumb schema to remain present');
  assert.ok(faqSchema, 'expected FAQ schema to remain present');
  assert.match(faqAnswers, /scope wizard/i);
  assert.match(faqAnswers, /bestel|bestellen|bestelling/i);
  assert.match(faqAnswers, /privacy-check/i);
  assert.match(faqAnswers, /10 tot 15 werkdagen/i);
});

test('solutions page JS keeps CTA hooks on rendered cards and avoids hidden injected panels', () => {
  const script = fs.readFileSync('assets/solutions-page.js', 'utf8');

  assert.match(script, /data-solution-action="buy"/);
  assert.match(script, /data-solution-action="demo"/);
  assert.match(script, /data-package-slug="\$\{item\.slug\}"/);
  assert.match(script, /Beste startpunt/);
  assert.doesNotMatch(script, /class="solution-card reveal"/);
  assert.doesNotMatch(script, /class="demo-card reveal"/);
});

test('solutions page JS includes submit locking and focus management hooks', () => {
  const script = fs.readFileSync('assets/solutions-page.js', 'utf8');

  assert.match(script, /let wizardSubmitPending = false/);
  assert.match(script, /if \(wizardSubmitPending\) return;/);
  assert.match(script, /function focusWizardStep/);
});
