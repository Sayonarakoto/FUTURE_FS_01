function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/95 py-10 text-center">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6">
        <p className="text-[10px] uppercase tracking-[0.45em] text-gray-500">Thank You</p>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
          © 2026 <span className="text-gray-900">A B Najeeb Rahman</span> | Built with React + GSAP + Tailwind
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
              className="text-[10px] uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-gray-900"
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
