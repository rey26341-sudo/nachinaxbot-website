import { NextResponse } from 'next/server';

const DEFAULT_TO_EMAIL = 'rengu26341@gmail.com';
const DEFAULT_FROM_EMAIL = 'NAXBOT Consultations <onboarding@resend.dev>';

type DemoRequestBody = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

async function sendViaResend(
  apiKey: string,
  toEmail: string,
  fromEmail: string,
  name: string,
  email: string,
  company: string,
  message: string,
) {
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
      text: formatEmailBody(name, email, company, message),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend error: ${detail}`);
  }
}

async function sendViaFormSubmit(
  toEmail: string,
  name: string,
  email: string,
  company: string,
  message: string,
) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      company,
      message,
      _subject: `New AI consultation request from ${name}`,
      _template: 'table',
      _captcha: 'false',
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`FormSubmit error: ${detail}`);
  }

  const data = await response.json().catch(() => ({}));
  if (data.success !== 'true' && data.success !== true) {
    throw new Error('FormSubmit did not confirm delivery.');
  }
}

function formatEmailBody(name: string, email: string, company: string, message: string) {
  return [
    'New consultation request from nachinaxbot.tech',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    '',
    'Message:',
    message,
  ].join('\n');
}

export async function POST(request: Request) {
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
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.DEMO_REQUEST_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;

  try {
    if (resendKey) {
      await sendViaResend(resendKey, toEmail, fromEmail, name, email, company, message);
    } else {
      await sendViaFormSubmit(toEmail, name, email, company, message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Demo request email failed:', error);
    return NextResponse.json(
      { error: 'Failed to send your request. Please try again or email us directly.' },
      { status: 502 },
    );
  }
}
