export default function Hero() {
  return (
    <section className="grid items-center gap-10 rounded-[2rem] border border-stone-200 bg-white/80 px-6 py-10 shadow-[var(--shadow-warm)] md:grid-cols-[1.15fr_0.85fr] md:px-10 md:py-14">
      <div>
        <div className="mb-4 inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900">
          AI Receptionist for Clinics, Salons & Appointment-Based Businesses
        </div>

        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-900 md:text-6xl">
          Building AI Agents That Automate Customer Operations
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
          We design intelligent AI systems that handle conversations, workflows, and business processes for growing companies — from AI receptionists for appointment-based businesses to multilingual support automation for modern customer teams.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#consultation"
            className="rounded-full bg-amber-700 px-6 py-3 text-center font-semibold text-white transition hover:bg-amber-800"
          >
            Build an AI Agent
          </a>
          <a
            href="#demo"
            className="rounded-full border border-stone-300 px-6 py-3 text-center font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-100"
          >
            Try NAXBOT Demo
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 text-sm text-stone-700">
          {['AI Receptionist', 'Customer Support AI', 'Workflow Automation', 'Multilingual Business Agents'].map((item) => (
            <span key={item} className="rounded-full border border-stone-200 bg-stone-50 px-3 py-2">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-stone-200 bg-gradient-to-br from-orange-50 to-amber-50 p-5">
        <div className="rounded-2xl bg-white p-4 shadow-md shadow-stone-300/40">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl bg-amber-100 p-4 text-sm text-amber-950">
              <p className="font-semibold">Customer inquiry</p>
              <p className="mt-2">“Can I speak to someone about a technician booking and payment status?”</p>
            </div>
            <div className="rounded-2xl bg-stone-100 p-4 text-sm text-stone-700">
              <p className="font-semibold">Intent triage</p>
              <p className="mt-2">Language detection → translation → workflow routing → CRM update</p>
            </div>
            <div className="rounded-2xl bg-emerald-100 p-4 text-sm text-emerald-900">
              <p className="font-semibold">Workflow status</p>
              <p className="mt-2">Ticket classified, customer answered, follow-up scheduled, and notification sent.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
