
import { NextResponse } from "next/server";
import { Resend } from "resend";

type Payload = {
  fullName?: string;
  name?: string;
  email?: string;
  mail?: string;
  tier?: string;
  amount?: string | number;
  message?: string;
  consent?: boolean | string | number;
  hp?: string;
};

function pick(val: any): string {
  return (val ?? "").toString().trim();
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Payload;

    const fullName = pick(data.fullName || data.name);
    const email = pick(data.email || data.mail);
    const tier = pick(data.tier);
    const amount = pick(data.amount);
    const message = pick(data.message);

    const consentRaw = (data.consent ?? "").toString();
    const consent = ["true","on","1","yes","y","checked","✓","✅","☑","☒","t","Y","True","TRUE","Ok","OK","ok","accepted","accept","agree","agreed"].includes(consentRaw);

    const missing: string[] = [];
    if (!fullName) missing.push("fullName");
    if (!email) missing.push("email");
    if (!tier) missing.push("tier");
    if (!amount) missing.push("amount");

    if (missing.length) {
      return NextResponse.json({ ok: false, error: "Missing required fields", missing }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ ok: false, error: "Consent is required" }, { status: 400 });
    }
    if (data.hp) {
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.TO_EMAIL || "info@bitcoinpetertodd.com";
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
      <pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;">${escapeHtml(message)}</pre>
    `;

    await resend.emails.send({ from, to, subject: "New Whitelist Application", html });

    if (email) {
      await resend.emails.send({
        from,
        to: email,
        subject: "We received your whitelist application",
        html: "<p>Thanks! We have received your application and will reach out for KYC/AML and on-chain instructions.</p>"
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export const runtime = "nodejs";
