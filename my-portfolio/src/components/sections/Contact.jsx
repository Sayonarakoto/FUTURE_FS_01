import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper, { sectionChildVariants } from '../SectionWrapper';

const fieldContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.08,
    },
  },
};

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
};

function Contact({ alwaysVisible = false, variant = 'section' }) {
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        try {
          const payload = await response.json();
          setErrorMessage(payload?.error ? String(payload.error) : '');
        } catch {
          setErrorMessage('');
        }
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error');
      setStatus('error');
    }
  };

  return (
    <SectionWrapper id="contact" className="bg-white bg-grid" alwaysVisible={alwaysVisible} variant={variant}>
      <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:pl-16">
        <motion.div variants={sectionChildVariants} className="pt-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-[var(--slate-accent)]">
                Contact
              </p>
              <h2 className="font-heading text-4xl font-semibold leading-[0.9] tracking-[0.03em] text-[var(--ink-main)] md:text-5xl">
                Contact
              </h2>
            </div>
          </div>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            Based in Vadakkancherry, Palakkad, Kerala. Available for collaborative projects, internships, and
            full-stack builds.
          </p>

          <motion.div variants={fieldContainerVariants} className="mt-8 space-y-3">
            {[
              { label: 'Email', val: 'naji03rahman@gmail.com' },
              { label: 'LinkedIn', val: 'https://www.linkedin.com/in/a-b-najeeb-rahman' },
              { label: 'GitHub', val: 'https://github.com/Sayonarakoto' },
              { label: 'Phone', val: '+91 9061394344' },
            ].map((link) => (
              <motion.div
                key={link.label}
                variants={fieldVariants}
                className="ink-card flex items-start justify-between gap-4 rounded-2xl border-l-[3px] border-l-[var(--slate-accent)] px-4 py-4"
              >
                <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
                  {link.label}
                </span>
                <span className="text-right text-sm font-medium text-[var(--ink-main)]">
                  {link.val}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="lg:mt-0">
          <motion.form
            variants={sectionChildVariants}
            onSubmit={handleSubmit}
            className="ink-card-strong rounded-[1.5rem] p-8"
          >
            <h3 className="border-b border-[var(--ink-main)] pb-4 font-heading text-3xl font-semibold text-[var(--ink-main)]">
              Message
            </h3>

            <motion.div variants={fieldContainerVariants} className="mt-6 space-y-5">
              <motion.label
                variants={fieldVariants}
                className="block text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]"
              >
                Name
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-[var(--paper-line)] bg-white/80 px-4 py-3 text-sm text-[var(--ink-main)] outline-none transition-colors focus:border-[var(--ink-main)]"
                  placeholder="Your name"
                />
              </motion.label>

              <motion.label
                variants={fieldVariants}
                className="block text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]"
              >
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-[var(--paper-line)] bg-white/80 px-4 py-3 text-sm text-[var(--ink-main)] outline-none transition-colors focus:border-[var(--ink-main)]"
                  placeholder="you@example.com"
                />
              </motion.label>

              <motion.label
                variants={fieldVariants}
                className="block text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]"
              >
                Message
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full resize-none rounded-xl border border-[var(--paper-line)] bg-white/80 px-4 py-3 text-sm text-[var(--ink-main)] outline-none transition-colors focus:border-[var(--ink-main)]"
                  placeholder="Tell me about your project"
                />
              </motion.label>
            </motion.div>

            <motion.button
              variants={fieldVariants}
              type="submit"
              disabled={status === 'sending'}
              className="editorial-cta mt-8 w-full justify-center disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </motion.button>

            {status === 'success' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 italic text-[var(--ink-main)]">
                Your letter has been sent to the portfolio inbox.
              </motion.p>
            )}

            {status === 'error' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 italic text-red-600">
                Failed to send message{errorMessage ? `: ${errorMessage}` : ''}. Please try again.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Contact;
