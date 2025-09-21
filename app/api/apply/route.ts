// app/api/apply/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

type AnyDict = Record<string, any>;

function toObjectFromForm(fd: FormData): AnyDict {
  const obj: AnyDict = {};
  for (const [k, v] of fd.entries()) obj[k] = typeof v === "string" ? v : (v as File).name;
  return obj;
}
async function parseBody(req: Request): Promise<AnyDict> {
  const ct = (req.headers.get("content-type") || "").toLowerCase();
  try {
    if (ct.includes("application/json")) return await req.json();
    if (ct.includes("application/x-www-form-urlencoded") || ct.includes("multipart/form-data")) {
      const fd = await req.formData();
      return toObjectFromForm(fd);
    }
  } catch {}
  try { return await req.json(); } catch {}
  try { const fd = await req.formData(); return toObjectFromForm(fd); } catch {}
  return {};
}

// --- простая защита ---
const recent = new Map<string, number>();
const RATE_MS = 15_000;

const esc = (s: string) =>
  String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

const row = (k: string, v: string) =>
  `<li><b>${esc(k)}:</b> ${v ? esc(v) : "—"}</li>`;

function cardHtml(inner: string) {
  return `
  <div style="font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;color:#eee;background:#0f0e0b;padding:24px">
    <div style="max-width:680px;margin:0 auto;border-radius:18px;padding:1px;background:
      conic-gradient(from 180deg at 50% 50%, rgba(255,200,0,.35), rgba(100,100,100,.2), rgba(255,200,0,.25), rgba(80,80,80,.2), rgba(255,200,0,.35))">
      <div style="background:rgba(20,19,14,.9);border-radius:17px;padding:20px 22px">
        ${inner}
      </div>
    </div>
  </div>`.trim();
}

export const runtime = "nodejs";

export async function POST(req: Request) {
  // rate-limit
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  const now = Date.now();
  const last = recent.get(ip) || 0;
  if (now - last < RATE_MS) {
    return NextResponse.json({ ok:false, error:"Too many requests" }, { status:429 });
  }

  const raw = await parseBody(req);

  // совместимость с разными именами полей
  const body = {
    fullName: String(raw.fullName ?? raw.name ?? "").trim(),
    email: String(raw.email ?? raw.mail ?? "").trim().toLowerCase(),
    tier: String(raw.tier ?? raw.participation ?? "").trim(),
    amount: String(raw.amount ?? raw.btc ?? raw.contribution ?? "").trim(),
    message: String(raw.message ?? raw.msg ?? raw.comment ?? "").trim(),
    consent: Boolean(raw.consent),
    hp: String(raw.hp ?? raw.website ?? "").trim(), // honeypot
  };

  // honeypot
  if (body.hp) return NextResponse.json({ ok: true });

  // ручная валидация (минимально жёсткая)
  const missing: string[] = [];
  if (body.fullName.length < 2) missing.push("fullName");
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(body.email)) missing.push("email");
  if (!["Strategic Investor","Premium Supporter","Early Partner"].includes(body.tier)) missing.push("tier");
  if (missing.length) {
    return NextResponse.json({ ok:false, error:"Invalid data", missing }, { status:400 });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO   = process.env.TO_EMAIL   || "info@bitcoinpetertodd.com";
  const FROM = process.env.FROM_EMAIL || "no-reply@bitcoinpetertodd.com";
  if (!RESEND_API_KEY) {
    return NextResponse.json({ ok:false, error:"Server email is not configured" }, { status:500 });
  }

  const resend = new Resend(RESEND_API_KEY);
  const subject = `New Whitelist Application — ${body.fullName}${body.amount ? ` (${body.amount} BTC)` : ""}`;

  const html = cardHtml(`
    <h2 style="margin:0 0 8px;font-size:20px;color:#fff">New Whitelist Application</h2>
    <ul style="margin:12px 0 0;padding:0 0 0 18px;line-height:1.55">
      ${row("Full name", body.fullName)}
      ${row("Email", body.email)}
      ${row("Participation tier", body.tier)}
      ${row("Intended contribution (BTC)", body.amount)}
    </ul>
    ${body.message ? `
    <div style="margin-top:14px">
      <div style="opacity:.8;font-size:12px;margin-bottom:6px">Message</div>
      <div style="white-space:pre-wrap;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:12px;color:#eee">
        ${esc(body.message)}
      </div>
    </div>` : ""}
    <div style="margin-top:16px;font-size:12px;color:#b3a57a">
      On-chain whitelist • Peter Todd Bitcoin
    </div>
  `);

  await resend.emails.send({
    from: FROM,
    to: TO,
    subject,
    html,
    reply_to: body.email || undefined,
  });

  if (body.email) {
    const confirmHtml = cardHtml(`
      <h3 style="margin:0 0 10px;font-size:18px;color:#fff">We received your application</h3>
      <p style="margin:0;color:#ddd">Thanks! We will contact you for KYC/AML and on-chain instructions.</p>
    `);
    await resend.emails.send({
      from: FROM,
      to: body.email,
      subject: "We received your whitelist application",
      html: confirmHtml,
    }).catch(() => {});
  }

  recent.set(ip, now);
  return NextResponse.json({ ok:true });
}
