import { NextResponse } from 'next/server';

const DEFAULT_TO_EMAIL = 'rengu26341@gmail.com';
const DEFAULT_FROM_EMAIL = 'NAXBOT Consultations <onboarding@resend.dev>';

type DemoRequestBody = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'Email delivery is not configured. Add RESEND_API_KEY to your Vercel environment variables.',
      },
      { status: 503 },
    );
  }

  let body: DemoRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const company = body.company?.trim() || 'Not provided';
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }

  const toEmail = process.env.DEMO_REQUEST_TO_EMAIL ?? DEFAULT_TO_EMAIL;
  const fromEmail = process.env.DEMO_REQUEST_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `New AI consultation request from ${name}`,
      text: [
        'New consultation request from nachinaxbot.tech',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Resend API error:', detail);
    return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
