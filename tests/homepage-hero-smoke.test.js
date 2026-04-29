import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('homepage hero exposes the refined audience copy and transition hook', () => {
  const html = fs.readFileSync('index.html', 'utf8');

  assert.match(html, /Voor slimmer werkende administratiekantoren/);
  assert.match(html, /class="intro-band intro-band-overlap"/);
  assert.match(html, /class="workflow-panel mail-panel reveal"/);
});

test('homepage hero keeps the rotating headline phrases', () => {
  const html = fs.readFileSync('index.html', 'utf8');

  assert.match(html, /extra personeel/);
  assert.match(html, /technische kennis/);
  assert.match(html, /langdurende setup/);
  assert.match(html, /generieke AI teksten/);
});
