function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; if (data.length > 1e6) req.destroy(); });
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function safeTrim(v) { return String(v || '').trim(); }
function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

// Website Aanmeldingen — dedicated Notion database for website email signups
const NOTION_SIGNUPS_DB = '33d0bd27-db50-8186-8ac2-fd3ffe9a4884';

async function saveToNotion(name, email) {
  const key = process.env.NOTION_API_KEY;
  if (!key) return { ok: false, reason: 'no_key' };

  const payload = {
    parent: { database_id: NOTION_SIGNUPS_DB },
    properties: {
      Naam: { title: [{ text: { content: name } }] },
      'E-mail': { email: email },
      Status: { select: { name: 'Nieuw' } },
      Bron: { rich_text: [{ text: { content: 'website-signup' } }] },
      Datum: { date: { start: new Date().toISOString() } }
    }
  };

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const err = await res.text().catch(() => '');
    return { ok: false, status: res.status, err: err.slice(0, 200) };
  }
  return { ok: true };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Alleen POST.' });

  let body;
  try { body = await readBody(req); } catch {
    return json(res, 400, { error: 'Ongeldige JSON.' });
  }

  const name = safeTrim(body.name);
  const email = safeTrim(body.email).toLowerCase();
  if (!name || !email || !isEmail(email)) {
    return json(res, 400, { error: 'Vul een geldige naam en e-mail in.' });
  }

  const result = await saveToNotion(name, email).catch(e => ({ ok: false, reason: e.message }));

  if (!result.ok) {
    console.error('Notion signup failed:', result);
    // Still return 200 to user — don't expose backend errors
  }

  return json(res, 200, { ok: true, message: 'Dank u. We nemen snel contact op.' });
};
