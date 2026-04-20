import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, House, FolderKanban, UserRound, Mail } from 'lucide-react'
import cvPdf from '../assets/OUR CV (3).pdf'
import { NAV_LINKS } from '../constants/links'

const navIconMap = {
  Home: House,
  Projects: FolderKanban,
  About: UserRound,
  Contact: Mail,
}

const containerVariants = {
  hidden: { opacity: 0, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.34, 1.56, 0.64, 1],
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (index = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay: index * 0.06,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
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
      <motion.header
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`fixed left-1/2 top-6 z-50 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 rounded-3xl border border-slate-200/70 bg-white/88 px-5 py-3 backdrop-blur-xl transition-all duration-500 sm:px-6 ${
          scrolled ? 'scale-[0.98] shadow-[0_12px_34px_rgba(148,163,184,0.24)]' : 'scale-100 shadow-[0_8px_24px_rgba(148,163,184,0.16)]'
        }`}
      >
        <nav className="flex items-center justify-between gap-4">
          <motion.a
            href="#home"
            onClick={(event) => handleNavigate(event, '#home')}
            variants={itemVariants}
            custom={0}
            className="select-none bg-gradient-to-b from-slate-800 to-slate-600 bg-clip-text text-lg font-black tracking-[0.18em] text-transparent sm:text-xl"
          >
            ABN
          </motion.a>

          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavigate(event, item.href)}
                variants={itemVariants}
                custom={index + 1}
                className="group relative text-xs font-medium uppercase tracking-[0.3em] text-slate-700 transition-colors hover:text-slate-900"
              >
                {item.label}
                <motion.span
                  aria-hidden
                  initial={{ width: 0, opacity: 0 }}
                  whileHover={{ width: '100%', opacity: 1 }}
                  transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
                  className="pointer-events-none absolute -bottom-2 left-0 h-px bg-gradient-to-r from-slate-500/90 to-slate-300/40"
                />
              </motion.a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <motion.a
              href={cvPdf}
              download
              variants={itemVariants}
              custom={5}
              className="rounded-xl border border-slate-300/80 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
            >
              Resume
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(event) => handleNavigate(event, '#contact')}
              variants={itemVariants}
              custom={6}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl border border-slate-700/90 bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
            >
              Let&apos;s Talk
            </motion.a>
          </div>

          <motion.button
            variants={itemVariants}
            custom={7}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white/85 text-slate-800 transition-colors hover:bg-slate-100 md:hidden"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 90 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="fixed right-4 top-24 z-40 w-72 rounded-2xl border border-slate-200/70 bg-white/95 p-6 shadow-[0_16px_36px_rgba(148,163,184,0.28)] backdrop-blur-xl md:hidden"
          >
            <div className="space-y-3">
              {NAV_LINKS.map((item, index) => {
                const Icon = navIconMap[item.label] ?? House
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => {
                      handleNavigate(event, item.href)
                      setIsOpen(false)
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * index }}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100/70 hover:text-slate-900"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-200 to-slate-300">
                      <Icon size={16} />
                    </span>
                    {item.label}
                  </motion.a>
                )
              })}

              <motion.a
                href={cvPdf}
                download
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mt-2 block rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-700"
              >
                Resume
              </motion.a>

              <motion.a
                href="#contact"
                onClick={(event) => {
                  handleNavigate(event, '#contact')
                  setIsOpen(false)
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="block rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white"
              >
                Let&apos;s Talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
