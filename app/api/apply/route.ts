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

const pick = (v: any) => (v ?? "").toString().trim();
const truthy = (v: any) => ["true","on","1","yes","y","checked","✓","✅","☑","☒","t","Y","True","TRUE","ok","OK","accepted","agree","agreed"].includes((v ?? "").toString().trim());

export async function POST(req: Request) {
  try {
    const data = await parseBody(req);
    console.log("APPLY BODY:", data); // ← смотрим логи в Vercel → Functions

    const fullName = pick(data.fullName ?? data.name);
    const email    = pick(data.email    ?? data.mail);
    const tier     = pick(data.tier);
    const amount   = pick(data.amount);
    const message  = pick(data.message);
    const consent  = truthy(data.consent);
    const hp       = pick(data.hp || data.website); // honeypot

    const missing: string[] = [];
    if (!fullName) missing.push("fullName");
    if (!email)    missing.push("email");
    if (!tier)     missing.push("tier");
    if (!amount)   missing.push("amount");

    if (missing.length) return NextResponse.json({ ok:false, error:"Missing required fields", missing }, { status:400 });
    if (!consent)       return NextResponse.json({ ok:false, error:"Consent is required" }, { status:400 });
    if (hp)             return NextResponse.json({ ok:true });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ ok:false, error:"Server email is not configured" }, { status:500 });

    const resend = new Resend(apiKey);
    const to   = process.env.TO_EMAIL   || "info@bitcoinpetertodd.com";
    const from = process.env.FROM_EMAIL || "no-reply@bitcoinpetertodd.com";

    const html = `
      <h2>New Whitelist Application</h2>
      <ul>
        <li><b>Full name:</b> ${escapeHtml(fullName)}</li>
        <li><b>Email:</b> ${escapeHtml(email)}</li>
        <li><b>Participation tier:</b> ${escapeHtml(tier)}</li>
        <li><b>Intended contribution (BTC):</b> ${escapeHtml(amount)}</li>
      </ul>
      <p><b>Message:</b></p>
      <pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,Consolas,monospace">${escapeHtml(message)}</pre>
    `;

    await resend.emails.send({ from, to, subject: "New Whitelist Application", html });
    if (email) {
      await resend.emails.send({
        from, to: email,
        subject: "We received your whitelist application",
        html: "<p>Thanks! We received your application and will reach out for KYC/AML and on-chain instructions.</p>",
      });
    }
    return NextResponse.json({ ok:true });
  } catch (e:any) {
    console.error("apply route error:", e);
    return NextResponse.json({ ok:false, error: e?.message || "Unknown error" }, { status:500 });
  }
}

function escapeHtml(str: string) {
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
export const runtime = "nodejs";
