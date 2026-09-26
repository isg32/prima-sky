// Receives the enquiry form and forwards it to a Google Apps Script web app that
// appends a row to the leads Google Sheet (see apps-script/README.md).

const MAX = { name: 80, phone: 20, email: 120, interest: 80, message: 1200, lang: 5, page: 300 };
type Field = keyof typeof MAX;

export async function POST(request: Request) {
  const url = process.env.APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;
  if (!url || !secret) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // honeypot: bots fill every field; pretend success
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const clean = {} as Record<Field, string>;
  for (const k of Object.keys(MAX) as Field[]) {
    const v = body[k];
    clean[k] = typeof v === "string" ? v.trim().slice(0, MAX[k]) : "";
  }
  const phone = clean.phone.replace(/\D/g, "");
  if (!clean.name || phone.length < 10) {
    return Response.json({ ok: false, error: "invalid" }, { status: 422 });
  }
  if (clean.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) clean.email = "";

  try {
    // Apps Script answers with a 302 to googleusercontent; fetch follows it.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...clean, phone, secret }),
      redirect: "follow",
      signal: AbortSignal.timeout(12_000),
    });
    const out = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!res.ok || !out?.ok) {
      return Response.json({ ok: false, error: "upstream" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
