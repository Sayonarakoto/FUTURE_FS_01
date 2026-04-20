import { useEffect, useState } from 'react'
import { Menu, X, House, FolderKanban, UserRound, Mail } from 'lucide-react'
import cvPdf from '../assets/OUR CV (3).pdf'
import { NAV_LINKS } from '../constants/links'

const navIconMap = {
  Home: House,
  Projects: FolderKanban,
  About: UserRound,
  Contact: Mail,
}

function Navbar({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavigate = (event, href) => {
    if (!onNavigate || !href?.startsWith('#')) return
    event.preventDefault()
    onNavigate(href)
  }

  return (
    <>
      <header
        className={`fixed left-1/2 top-6 z-50 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 rounded-3xl border border-slate-200/70 bg-white/88 px-5 py-3 backdrop-blur-xl transition-all duration-500 sm:px-6 ${
          scrolled ? 'scale-[0.98] shadow-[0_12px_34px_rgba(148,163,184,0.24)]' : 'scale-100 shadow-[0_8px_24px_rgba(148,163,184,0.16)]'
        }`}
      >
        <nav className="flex items-center justify-between gap-4">
          <a
            href="#home"
            onClick={(event) => handleNavigate(event, '#home')}
            className="select-none bg-gradient-to-b from-slate-800 to-slate-600 bg-clip-text text-lg font-black tracking-[0.18em] text-transparent sm:text-xl"
          >
            ABN
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavigate(event, item.href)}
                className="nav-link group relative text-xs font-medium uppercase tracking-[0.3em] text-slate-700 transition-colors hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={cvPdf}
              download
              className="rounded-xl border border-slate-300/80 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
            >
              Resume
            </a>
            <a
              href="#contact"
              onClick={(event) => handleNavigate(event, '#contact')}
              className="rounded-xl border border-slate-700/90 bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98]"
            >
              Let&apos;s Talk
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white/85 text-slate-800 transition-colors hover:bg-slate-100 md:hidden"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      <div
        className={`fixed right-4 top-24 z-40 w-72 rounded-2xl border border-slate-200/70 bg-white/95 p-6 shadow-[0_16px_36px_rgba(148,163,184,0.28)] backdrop-blur-xl transition-all duration-300 md:hidden ${
          isOpen ? 'pointer-events-auto translate-x-0 opacity-100' : 'pointer-events-none translate-x-6 opacity-0'
        }`}
      >
        <div className="space-y-3">
          {NAV_LINKS.map((item) => {
            const Icon = navIconMap[item.label] ?? House
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  handleNavigate(event, item.href)
                  setIsOpen(false)
                }}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100/70 hover:text-slate-900"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-200 to-slate-300">
                  <Icon size={16} />
                </span>
                {item.label}
              </a>
            )
          })}

          <a
            href={cvPdf}
            download
            onClick={() => setIsOpen(false)}
            className="mt-2 block rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-700"
          >
            Resume
          </a>

          <a
            href="#contact"
            onClick={(event) => {
              handleNavigate(event, '#contact')
              setIsOpen(false)
            }}
            className="block rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white"
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar
