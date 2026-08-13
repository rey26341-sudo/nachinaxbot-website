import DemoBookingForm from '@/components/DemoBookingForm';
import DemoChatbot from '@/components/DemoChatbot';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Products from '@/components/Products';

const caseStudies = [
  {
    title: 'NAXBOT AI Receptionist',
    problem: 'Businesses lose customers because enquiries are unanswered.',
    solution:
      'Multi-tenant AI receptionist platform using FastAPI, LangGraph, PostgreSQL, Gemini, and Docker to capture, qualify, and route bookings automatically.',
  },
  {
    title: 'Multilingual Tourism Workflow Agent',
    problem: 'Companies receive customer requests in multiple languages.',
    solution:
      'AI workflow agent that translates, extracts intent, validates information, and triggers business workflows for tourism and service operations.',
  },
  {
    title: 'Enterprise Customer Support Agent',
    problem: 'Repeated B2C customer questions consume support bandwidth.',
    solution:
      'A future-focused AI agent that automates repetitive customer support queries with ticket routing, CRM updates, and workflow orchestration.',
  },
];

const industries = ['Healthcare', 'Travel & Tourism', 'Ecommerce', 'Retail', 'Hospitality', 'Education', 'SaaS'];

const whyChooseUs = [
  'AI Agent Engineer',
  'Backend Developer',
  'Cloud Infrastructure Engineer',
  'LangGraph / LangChain',
  'FastAPI',
  'PostgreSQL',
  'Qdrant RAG',
  'Kubernetes',
  'AWS',
  'Docker',
  'Workflow automation',
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fde68a,_#faf8f5_55%)] text-stone-900">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-8 md:px-10">
        <Hero />

        <section className="rounded-[2rem] border border-stone-200 bg-white/80 p-6 shadow-[var(--shadow-warm)] md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['Built by NACHI NAXBOT Tech', 'We build AI agents that automate customer conversations and business workflows for modern companies.'],
              ['Current product scope', 'AI receptionists, multilingual workflow agents, support automation, and API-connected customer operations systems.'],
            ].map(([label, detail]) => (
              <div key={label} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <p className="text-lg font-semibold text-amber-800">{label}</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <Products />

        <section id="case-studies" className="rounded-[2rem] border border-stone-200 bg-white/80 p-6 shadow-[var(--shadow-warm)] md:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800">Case studies</p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900">Selected project narratives</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <article key={study.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <p className="text-lg font-semibold text-stone-900">{study.title}</p>
                <p className="mt-4 text-sm font-semibold text-amber-800">Problem</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{study.problem}</p>
                <p className="mt-4 text-sm font-semibold text-amber-800">Solution</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{study.solution}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="industries" className="rounded-[2rem] border border-stone-200 bg-white/80 p-6 shadow-[var(--shadow-warm)] md:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800">Industries</p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900">Where our AI systems fit</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <div key={industry} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
                {industry}
              </div>
            ))}
          </div>
        </section>

        <section id="why-choose-us" className="rounded-[2rem] border border-stone-200 bg-white/80 p-6 shadow-[var(--shadow-warm)] md:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800">Why choose us</p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900">Engineer-led automation across the stack</h2>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {whyChooseUs.map((item) => (
              <div key={item} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        <DemoChatbot />

        <section id="consultation" className="rounded-[2rem] border border-amber-200 bg-amber-50/80 p-6 shadow-[var(--shadow-warm)] md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800">For businesses</p>
              <h2 className="mt-2 text-3xl font-semibold text-stone-900">Need an AI agent for your business?</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
                We build custom AI systems that connect with your existing tools and automate customer operations.
              </p>
            </div>
            <DemoBookingForm />
          </div>
        </section>
      </main>
    </div>
  );
}
