'use client';

import { FormEvent, useMemo, useState } from 'react';

type Message = {
  role: 'assistant' | 'user';
  content: string;
};

const starterMessages: Message[] = [
  {
    role: 'assistant',
    content: 'Hi! I’m NAXBOT AI. Try: “Book an appointment for tomorrow”.',
  },
];

const quickPrompts = [
  'Book an appointment tomorrow',
  'What services do you offer?',
  'What are your opening hours?',
];

const businessProfiles = [
  'medical_clinic',
  'dental_clinic',
  'physiotherapy',
  'salon',
  'beauty_salon',
  'hair_salon',
  'spa',
  'veterinary_clinic',
  'idolstore',
  'clinic_demo',
];

const profileLabels: Record<string, string> = {
  medical_clinic: 'Medical Clinic',
  dental_clinic: 'Dental Clinic',
  physiotherapy: 'Physiotherapy',
  salon: 'Salon',
  beauty_salon: 'Beauty Salon',
  hair_salon: 'Hair Salon',
  spa: 'Spa',
  veterinary_clinic: 'Veterinary Clinic',
  idolstore: 'Idol Store',
  clinic_demo: 'Clinic Demo',
};

const DEFAULT_ENDPOINT = 'https://yellamma-db.onrender.com/chat';

export default function DemoChatbot() {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [businessId, setBusinessId] = useState('medical_clinic');
  const [sessionId, setSessionId] = useState<string | null>(null);

  const endpoint = useMemo(() => {
    return process.env.NEXT_PUBLIC_FASTAPI_URL ?? DEFAULT_ENDPOINT;
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();

    if (!trimmed || isLoading) {
      return;
    }

    const userMessage: Message = { role: 'user', content: trimmed };
    setMessages((current) => [...current, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business_id: businessId,
          message: trimmed,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat request failed (${response.status})`);
      }

      const data = await response.json();

      if (typeof data.session_id === 'string') {
        setSessionId(data.session_id);
      }

      const assistantReply =
        typeof data.reply === 'string'
          ? data.reply
          : 'I can help with booking, pricing, and appointment follow-ups.';

      setMessages((current) => [...current, { role: 'assistant', content: assistantReply }]);
    } catch {
      const fallbackReply =
        'The chat backend is not reachable right now. Confirm NEXT_PUBLIC_FASTAPI_URL is set to ' +
        endpoint +
        ' and that CORS allows this site.';

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: fallbackReply,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="demo"
      className="grid gap-6 rounded-[2rem] border border-stone-200 bg-white/80 p-6 shadow-[var(--shadow-warm)] md:grid-cols-[0.9fr_1.1fr] md:p-8"
    >
      <div className="space-y-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800">NAXBOT demo</p>
          <h2 className="mt-2 text-3xl font-semibold text-stone-900">
            Preview the configured AI receptionist workflow
          </h2>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <p>
            Endpoint: <span className="font-semibold">{endpoint}</span>
          </p>
          <p className="mt-2 text-amber-900/90">
            Live demo wired to the FastAPI chat contract: business_id, message, and session_id.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ['Website chatbot', 'Answer visitors instantly on your site.'],
            ['WhatsApp automation', 'Qualify leads and continue the conversation on a preferred channel.'],
            ['Voice receptionist', 'Support missed calls and after-hours booking requests.'],
            ['Business profile routing', 'Route responses by selected business profile.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <h3 className="font-semibold text-stone-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 shadow-lg shadow-stone-300/40">
        <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-3 text-xs uppercase tracking-[0.28em] text-stone-500">Live demo</span>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-stone-200 bg-white p-2">
          <label htmlFor="business-id" className="text-xs uppercase tracking-[0.28em] text-stone-500">
            Business profile
          </label>
          <select
            id="business-id"
            value={businessId}
            onChange={(event) => {
              setBusinessId(event.target.value);
              setSessionId(null);
            }}
            className="flex-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-amber-400"
          >
            {businessProfiles.map((profile) => (
              <option key={profile} value={profile}>
                {profileLabels[profile]}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 space-y-3">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                message.role === 'assistant'
                  ? 'bg-amber-100 text-amber-950'
                  : 'ml-auto bg-stone-200 text-stone-900'
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setInput(prompt)}
              className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-600 transition hover:border-amber-300 hover:text-stone-900"
            >
              {prompt}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about pricing, services, availability, or bookings..."
            className="flex-1 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-amber-400"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-2xl bg-amber-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Thinking...' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  );
}
