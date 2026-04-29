const { afterEach, test } = require('node:test');
const assert = require('node:assert/strict');
const { Readable } = require('node:stream');

const handler = require('../api/email-signup.js');

const ORIGINAL_FETCH = globalThis.fetch;
const ORIGINAL_NOTION_KEY = process.env.NOTION_API_KEY;

function createRequest(body) {
  const stream = Readable.from([JSON.stringify(body)]);
  stream.method = 'POST';
  return stream;
}

function createResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader(name, value) {
      this.headers[name] = value;
    },
    end(payload) {
      this.body = payload;
    }
  };
}

async function invoke(body) {
  const req = createRequest(body);
  const res = createResponse();
  await handler(req, res);

  return {
    statusCode: res.statusCode,
    headers: res.headers,
    json: JSON.parse(res.body)
  };
}

afterEach(() => {
  globalThis.fetch = ORIGINAL_FETCH;
  process.env.NOTION_API_KEY = ORIGINAL_NOTION_KEY;
});

test('fixed-solution submissions save an intake summary and return the dedicated success message', async () => {
  const fetchCalls = [];
  process.env.NOTION_API_KEY = 'test-notion-key';
  globalThis.fetch = async (url, options) => {
    fetchCalls.push({ url, options });
    return {
      ok: true,
      status: 200,
      text: async () => ''
    };
  };

  const result = await invoke({
    mode: 'fixed-solution',
    packageSlug: 'slimme-mail-triage',
    company: 'Van Dijk & Partners',
    contactName: 'Sanne van Dijk',
    contact: 'sanne@vandijk.test',
    officeSize: '11-25',
    mailStack: 'Outlook + Exchange',
    privacyNeeds: 'AVG proof logging',
    notes: 'Graag koppelen aan bestaande intake.'
  });

  assert.equal(result.statusCode, 200);
  assert.deepEqual(result.json, {
    ok: true,
    message: 'Dank u. We controleren of dit pakket goed past bij uw kantoor en koppelen snel terug met de volgende stap.'
  });
  assert.equal(fetchCalls.length, 1);

  const notionPayload = JSON.parse(fetchCalls[0].options.body);
  assert.equal(notionPayload.properties.Naam.title[0].text.content, 'Vaste oplossing intake: slimme-mail-triage');
  assert.equal(notionPayload.properties.Bron.rich_text[0].text.content, 'website-fixed-solution');
  assert.match(
    notionPayload.children[0].paragraph.rich_text[0].text.content,
    /Pakket: slimme-mail-triage[\s\S]*Kantoornaam: Van Dijk & Partners[\s\S]*Contactpersoon: Sanne van Dijk[\s\S]*Contact: sanne@vandijk\.test[\s\S]*Kantoorgrootte: 11-25[\s\S]*Mailstack: Outlook \+ Exchange/
  );
});

test('fixed-solution submissions reject missing required fields before saving', async () => {
  let fetchCalled = false;
  process.env.NOTION_API_KEY = 'test-notion-key';
  globalThis.fetch = async () => {
    fetchCalled = true;
    throw new Error('fetch should not be called');
  };

  const result = await invoke({
    mode: 'fixed-solution',
    packageSlug: 'slimme-mail-triage',
    company: '',
    contactName: 'Sanne van Dijk',
    contact: 'sanne@vandijk.test',
    officeSize: '11-25',
    mailStack: 'Outlook + Exchange'
  });

  assert.equal(result.statusCode, 400);
  assert.deepEqual(result.json, {
    error: 'Vul uw pakket, kantoornaam, naam, contactgegevens, kantooromvang en mailomgeving in.'
  });
  assert.equal(fetchCalled, false);
});
