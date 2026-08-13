'use client';

import { FormEvent, useState } from 'react';

type FormState = 'idle' | 'submitting' | 'submitted' | 'error';

export default function DemoBookingForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          typeof data.error === 'string' ? data.error : 'Could not send your request. Please try again.',
        );
      }

      setFormState('submitted');
    } catch (error) {
      setFormState('error');
      setErrorMessage(error instanceof Error ? error.message : 'Could not send your request. Please try again.');
    }
  };

  if (formState === 'submitted') {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-stone-800">
        <p className="text-lg font-semibold text-stone-900">Thanks — we received your request.</p>
        <p className="mt-2 text-sm leading-7 text-stone-600">
          Our team will follow up at <span className="font-medium text-stone-900">{email}</span> shortly.
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
            disabled={formState === 'submitting'}
            className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none focus:border-amber-400 disabled:opacity-60"
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
            disabled={formState === 'submitting'}
            className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none focus:border-amber-400 disabled:opacity-60"
            placeholder="you@company.com"
          />
        </label>
      </div>

      <label className="block text-sm text-stone-700">
        Company
        <input
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          disabled={formState === 'submitting'}
          className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none focus:border-amber-400 disabled:opacity-60"
          placeholder="Business name"
        />
      </label>

      <label className="block text-sm text-stone-700">
        What would you like to automate?
        <textarea
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={formState === 'submitting'}
          rows={4}
          className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none focus:border-amber-400 disabled:opacity-60"
          placeholder="Tell us about your use case, channels, and timeline."
        />
      </label>

      {formState === 'error' && errorMessage ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{errorMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {formState === 'submitting' ? 'Sending...' : 'Request AI Automation Consultation'}
      </button>
    </form>
  );
}
