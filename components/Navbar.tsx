const navItems = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Industries', href: '#industries' },
  { label: 'Why Choose Us', href: '#why-choose-us' },
  { label: 'Demo', href: '#demo' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-[#faf8f5]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4 md:px-10">
        <div>
          <p className="text-lg font-semibold tracking-wide text-stone-900">NACHI NAXBOT Tech</p>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-800">AI Agent Engineering</p>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-stone-600 md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-stone-900">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#consultation"
          className="rounded-full bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800"
        >
          Request AI Automation Consultation
        </a>
      </div>
    </header>
  );
}
