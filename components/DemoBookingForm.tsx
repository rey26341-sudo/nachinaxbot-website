'use client';

import { FormEvent, useState } from 'react';

type FormState = 'idle' | 'submitted';

// TODO: Wire this form to a real lead-capture endpoint (e.g. FastAPI /demo-request or a form service).
// The previous target https://api.nachinaxbot.tech/api/demo-request does not exist.

export default function DemoBookingForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Mock success until a backend endpoint is available.
    setFormState('submitted');
  };

  if (formState === 'submitted') {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-stone-800">
        <p className="text-lg font-semibold text-stone-900">Thanks — we received your request.</p>
        <p className="mt-2 text-sm leading-7 text-stone-600">
          This form is temporarily running in demo mode. We will follow up at{' '}
          <span className="font-medium text-stone-900">{email}</span> once the consultation API is connected.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-stone-700">
          Name
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none focus:border-amber-400"
            placeholder="Your name"
          />
        </label>
        <label className="block text-sm text-stone-700">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none focus:border-amber-400"
            placeholder="you@company.com"
          />
        </label>
      </div>

      <label className="block text-sm text-stone-700">
        Company
        <input
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none focus:border-amber-400"
          placeholder="Business name"
        />
      </label>

      <label className="block text-sm text-stone-700">
        What would you like to automate?
        <textarea
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={4}
          className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none focus:border-amber-400"
          placeholder="Tell us about your use case, channels, and timeline."
        />
      </label>

      <p className="text-xs text-stone-500">
        Demo mode: submissions are not sent to a server yet. TODO — connect to a real /demo-request endpoint.
      </p>

      <button
        type="submit"
        className="rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
      >
        Request AI Automation Consultation
      </button>
    </form>
  );
}
