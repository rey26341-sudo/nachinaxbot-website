const products = [
  {
    title: 'AI Receptionist Platform',
    description:
      'Built for healthcare, salons, hospitality, and appointment-led businesses that need instant web, WhatsApp, and voice intake.',
    tag: 'Industries: Healthcare, salons, hospitality',
    features: ['Website chatbot', 'WhatsApp automation', 'Voice receptionist', 'Appointment booking', 'Follow-ups'],
  },
  {
    title: 'Customer Support AI Agents',
    description:
      'Automate repetitive support conversations, order help, ticket triage, and workflow routing for ecommerce, B2C, and SaaS teams.',
    tag: 'Industries: Ecommerce, B2C, SaaS',
    features: ['Customer query handling', 'Order support', 'Ticket classification', 'Workflow automation', 'CRM integration'],
  },
  {
    title: 'Multilingual Workflow Agents',
    description:
      'Deploy agents that detect language, translate requests, extract intent, validate information, and trigger CRM or notification workflows.',
    tag: 'Project pattern',
    features: ['Chinese customer', 'Language detection', 'Translation', 'Intent extraction', 'CRM / Notification'],
  },
  {
    title: 'Custom AI Automation',
    description:
      'We build custom AI agents connected with APIs, databases, and existing company workflows to automate customer operations across your stack.',
    tag: 'Integration ready',
    features: ['API integration', 'Database workflows', 'Business rule orchestration', 'Existing operations alignment'],
  },
];

export default function Products() {
  return (
    <section id="solutions" className="rounded-[2rem] border border-stone-200 bg-white/80 p-6 shadow-[var(--shadow-warm)] md:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800">AI solutions</p>
        <h2 className="mt-2 text-3xl font-semibold text-stone-900">Systems that automate conversations and operations</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <article key={product.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
              {product.tag}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-stone-900">{product.title}</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">{product.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-stone-700">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
