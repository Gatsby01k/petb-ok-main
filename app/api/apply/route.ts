
import { NextResponse } from "next/server";
import { Resend } from "resend";

type Payload = {
  fullName: string;
  email: string;
  tier: string;
  amount: string;
  message?: string;
  consent: boolean;
  hp?: string;
};

const ALLOWED_ORIGINS = ["https://petb-ok-main.vercel.app", "http://localhost:3000"];

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Payload;

    if (!data.fullName || !data.email || !data.tier || !data.amount) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }
    if (!data.consent) {
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
        <li><b>Full name:</b> ${escapeHtml(data.fullName)}</li>
        <li><b>Email:</b> ${escapeHtml(data.email)}</li>
        <li><b>Participation tier:</b> ${escapeHtml(data.tier)}</li>
        <li><b>Intended contribution (BTC):</b> ${escapeHtml(data.amount)}</li>
      </ul>
      <p><b>Message:</b></p>
      <pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;">${escapeHtml(data.message || "")}</pre>
    `;

    await resend.emails.send({ from, to, subject: "New Whitelist Application", html });

    if (data.email) {
      await resend.emails.send({
        from,
        to: data.email,
        subject: "We received your whitelist application",
        html: "<p>Thanks! We have received your application and will reach out for KYC/AML and on‑chain instructions.</p>"
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
