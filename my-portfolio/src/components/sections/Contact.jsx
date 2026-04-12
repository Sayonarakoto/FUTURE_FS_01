import { motion } from 'framer-motion'
import SectionWrapper, { sectionChildVariants } from '../SectionWrapper'

const fieldContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.08,
    },
  },
}

const fieldVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 18,
    },
  },
}

function Contact() {
  return (
    <SectionWrapper id="contact">
      <div className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div variants={sectionChildVariants}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-[var(--slate-accent)]">Contact</p>
              <h2 className="font-heading text-4xl font-semibold leading-[0.9] tracking-[0.03em] text-[var(--ink-main)] md:text-5xl">
                Contact
              </h2>
            </div>
            <p className="hidden font-heading text-2xl font-semibold uppercase tracking-[0.22em] text-[var(--ink-main)] lg:block">
              Contact
            </p>
          </div>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            Based in Vadakkancherry, Palakkad, Kerala. Available for collaborative projects, internships, and
            full-stack builds.
          </p>

          <motion.div variants={fieldContainerVariants} className="mt-8 space-y-3">
            {[
              { label: 'Email', val: 'naji03rahman@gmail.com' },
              { label: 'LinkedIn', val: 'linkedin.com/in/a-b-najeeb-rahman-0201392b4' },
              { label: 'GitHub', val: 'github.com/Sayonarakoto' },
              { label: 'Phone', val: '+91 9061394344' },
            ].map((link) => (
              <motion.div
                key={link.label}
                variants={fieldVariants}
                className="ink-card flex items-start justify-between gap-4 rounded-2xl border-l-[3px] border-l-[var(--slate-accent)] px-4 py-4"
              >
                <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">{link.label}</span>
                <span className="text-right text-sm font-medium text-[var(--ink-main)]">{link.val}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.form variants={sectionChildVariants} className="ink-card-strong rounded-[1.5rem] p-8">
          <h3 className="border-b border-[var(--paper-line)] pb-4 font-heading text-3xl font-semibold text-[var(--ink-main)]">
            Message
          </h3>

          <motion.div variants={fieldContainerVariants} className="mt-6 space-y-5">
            <motion.label variants={fieldVariants} className="block text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
              Name
              <input
                className="mt-2 w-full rounded-xl border border-[var(--paper-line)] bg-white/80 px-4 py-3 text-sm text-[var(--ink-main)] outline-none transition-colors focus:border-[rgba(148,163,184,0.45)]"
                placeholder="Your name"
              />
            </motion.label>

            <motion.label variants={fieldVariants} className="block text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
              Email
              <input
                type="email"
                className="mt-2 w-full rounded-xl border border-[var(--paper-line)] bg-white/80 px-4 py-3 text-sm text-[var(--ink-main)] outline-none transition-colors focus:border-[rgba(148,163,184,0.45)]"
                placeholder="you@example.com"
              />
            </motion.label>

            <motion.label variants={fieldVariants} className="block text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
              Message
              <textarea
                rows="4"
                className="mt-2 w-full resize-none rounded-xl border border-[var(--paper-line)] bg-white/80 px-4 py-3 text-sm text-[var(--ink-main)] outline-none transition-colors focus:border-[rgba(148,163,184,0.45)]"
                placeholder="Tell me about your project"
              />
            </motion.label>
          </motion.div>

          <motion.button variants={fieldVariants} type="button" className="editorial-cta mt-8 w-full justify-center">
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </SectionWrapper>
  )
}

export default Contact
