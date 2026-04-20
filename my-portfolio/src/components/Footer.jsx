function Footer() {
  return (
    <footer className="border-t border-[var(--paper-line)] bg-[rgba(255,255,255,0.65)] py-10 text-center">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6">
        <p className="text-[10px] uppercase tracking-[0.45em] text-[var(--ink-muted)]">Thank You</p>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]">
          © 2026 <span className="text-[var(--rose-accent)]">A B Najeeb Rahman</span> | Built with React + GSAP + Tailwind
        </p>
        <div className="mt-1 flex flex-wrap justify-center gap-6">
          {[
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/a-b-najeeb-rahman',
            },
            { label: 'GitHub', href: 'https://github.com/Sayonarakoto' },
            { label: 'Email', href: 'mailto:naji03rahman@gmail.com' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] transition-colors hover:text-[var(--rose-accent)]"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
