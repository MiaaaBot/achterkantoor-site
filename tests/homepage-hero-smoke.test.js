import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('homepage hero keeps the core positioning and workflow demo intact', () => {
  const html = fs.readFileSync('index.html', 'utf8');

  assert.match(html, /<header class="hero">/);
  assert.match(html, /class="[^"]*\bhero-grid\b[^"]*"/);
  assert.match(html, /class="[^"]*\bhero-copy\b[^"]*"/);
  assert.match(html, /class="[^"]*\bheadline-switch\b[^"]*"/);
  assert.match(html, /aria-label="[^"]*Zonder extra personeel[^"]*"/);
  assert.match(html, /class="[^"]*\brotating-words\b[^"]*"/);
  assert.match(html, /class="(?=[^"]*\bworkflow-panel\b)(?=[^"]*\bmail-panel\b)(?=[^"]*\breveal\b)[^"]*"/);
  assert.match(html, /aria-label="Voorbeeld van inbox automatisering"/);
  assert.match(html, /class="[^"]*\bhero-actions\b[^"]*"/);
  assert.match(html, /class="(?=[^"]*\bbtn\b)(?![^"]*\bbtn-secondary\b)[^"]*"/);
  assert.match(html, /class="(?=[^"]*\bbtn\b)(?=[^"]*\bbtn-secondary\b)[^"]*"/);
});

test('homepage below-hero sections expose the new story structure', () => {
  const html = fs.readFileSync('index.html', 'utf8');

  assert.match(html, /class="[^"]*\bworkflow-story\b[^"]*"/);
  assert.match(html, /aria-label="Workflowverhaal"/);
  assert.match(html, /class="[^"]*\bworkflow-story-shell\b[^"]*"/);
  assert.match(html, /class="[^"]*\bworkflow-story-copy\b[^"]*"/);
  assert.match(html, /class="[^"]*\bworkflow-story-visual\b[^"]*"/);
  assert.match(html, /class="[^"]*\bworkflow-map\b[^"]*"/);
  assert.match(html, /Intake/);
  assert.match(html, /Documenten/);
  assert.match(html, /Status/);
  assert.match(html, /Overdracht/);
  assert.match(html, /class="[^"]*\bworkflow-story-points\b[^"]*"/);
  assert.equal((html.match(/class="[^"]*\bworkflow-point\b[^"]*"/g) || []).length, 3);
  assert.match(html, /id="werkwijze" class="[^"]*\bsection\b[^"]*\bstart-rhythm\b[^"]*"/);
  assert.match(html, /id="werkwijze"/);
  assert.match(html, /class="[^"]*\bsteps-grid\b[^"]*"/);
  assert.match(html, /id="voorbeelden" class="[^"]*\bsection\b[^"]*\bworkflow-areas\b[^"]*"/);
  assert.match(html, /class="[^"]*\bexample-grid\b[^"]*"/);
  assert.equal((html.match(/class="[^"]*\bexample-card\b[^"]*"/g) || []).length, 4);
  assert.match(html, /class="[^"]*\bcontrol-story\b[^"]*"/);
  assert.match(html, /class="[^"]*\btrust-list\b[^"]*"/);
});
