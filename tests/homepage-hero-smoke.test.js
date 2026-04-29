import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('homepage below-hero sections expose the new story structure', () => {
  const html = fs.readFileSync('index.html', 'utf8');

  assert.match(html, /class="[^"]*\bworkflow-story\b/);
  assert.match(html, /AchterKantoor helpt u zien waar AI tijd scheelt/);
  assert.match(html, /class="[^"]*\bstart-rhythm\b/);
  assert.match(html, /We starten klein, in een proces dat elke week tijd kost/);
  assert.match(html, /id="voorbeelden"/);
  assert.match(html, /Zo ziet slimmer werk in uw kantoor eruit/);
  assert.match(html, /documenten najagen/i);
  assert.match(html, /statusvragen beantwoorden/i);
  assert.match(html, /class="[^"]*\bcontrol-story\b/);
  assert.match(html, /wat automatisch loopt en wat bij het team blijft/i);
});
