// Cloudflare Pages Function — proxies /checkout-info to the licence server.
//
// Browser → /api/checkout-info?session_id=cs_live_xxx
// Function → GET https://pay.asteriscommerce.com/wp-json/asteris/v1/checkout-info
//            ?session_id=cs_live_xxx
//            &signature=<hmac_sha256(session_id, ASTERIS_LS_API_SIGNING_SECRET)>
//
// The signing secret stays server-side (env var) and never reaches the browser.
// Endpoint contract corrected 5 Jun 2026 PM: GET with query params (NOT POST).

const LS_URL = 'https://pay.asteriscommerce.com/wp-json/asteris/v1/checkout-info';

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const sessionId = url.searchParams.get('session_id');

  if (!sessionId || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
    return json({ error: 'invalid_session_id' }, 400);
  }

  const secret = context.env.ASTERIS_LS_SIGNING_SECRET;
  if (!secret) {
    return json({ error: 'server_not_configured' }, 500);
  }

  const signature = await hmacSha256Hex(secret, sessionId);

  const upstream = new URL(LS_URL);
  upstream.searchParams.set('session_id', sessionId);
  upstream.searchParams.set('signature', signature);

  const res = await fetch(upstream.toString(), { method: 'GET' });
  const body = await res.text();
  return new Response(body, {
    status: res.status,
    headers: { 'content-type': 'application/json' },
  });
}

async function hmacSha256Hex(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
