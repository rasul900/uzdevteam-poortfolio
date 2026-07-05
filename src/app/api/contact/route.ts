import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAIL = process.env.CONTACT_TO ?? "abdurasulxayrulayev@gmail.com";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      return NextResponse.json(
        { error: "Email server not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const phoneLine = phone?.trim() ? phone.trim() : "Ko'rsatilmagan";

    await transporter.sendMail({
      from: `"UZ DEV TEAM" <${gmailUser}>`,
      to: TO_EMAIL,
      replyTo: email.trim(),
      subject: `UZ DEV TEAM — Yangi xabar: ${name.trim()}`,
      text: [
        "Yangi murojaat — UZ DEV TEAM sayti",
        "",
        `Ism: ${name.trim()}`,
        `Telefon: ${phoneLine}`,
        `Email: ${email.trim()}`,
        "",
        "Xabar:",
        message.trim(),
      ].join("\n"),
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#0F172A;color:#F1F5F9;border-radius:12px">
          <h2 style="color:#60A5FA;margin:0 0 20px">Yangi murojaat — UZ DEV TEAM</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#94A3B8;width:100px">Ism</td><td style="padding:8px 0;font-weight:600">${name.trim()}</td></tr>
            <tr><td style="padding:8px 0;color:#94A3B8">Telefon</td><td style="padding:8px 0;font-weight:600">${phoneLine}</td></tr>
            <tr><td style="padding:8px 0;color:#94A3B8">Email</td><td style="padding:8px 0"><a href="mailto:${email.trim()}" style="color:#60A5FA">${email.trim()}</a></td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:rgba(255,255,255,0.05);border-radius:8px;border-left:3px solid #3B82F6">
            <p style="margin:0 0 8px;color:#94A3B8;font-size:13px">Xabar:</p>
            <p style="margin:0;white-space:pre-wrap;line-height:1.6">${message.trim()}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
