import { useRef } from 'react'
import SectionWrapper from '../SectionWrapper'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const timelineItems = [
  {
    title: 'Diploma in Computer Engineering',
    period: '2023 - 2026',
    org: "St. Mary's Institute of Technology & Science",
    category: 'Education',
    description: 'Focused on software architecture, problem solving, and practical engineering fundamentals.',
  },
  {
    title: 'Raspberry Pi Code Club Leader',
    period: 'Leadership',
    org: "St. Mary's Institute",
    category: 'Club',
    description: 'Mentored students in HTML, CSS, and JavaScript through hands-on build sessions.',
  },
  {
    title: 'INET-INFOTECH Internship (MERN)',
    period: 'Internship',
    org: 'MERN Stack Development',
    category: 'Internship',
    description: 'Built interactive React UI and improved component structure for maintainability.',
  },
  {
    title: 'AI Automation Workshop',
    period: 'Aug 2025 - Sep 2025',
    org: 'Entrepreneurship Lab (Skool)',
    category: 'Apprenticeship',
    description: 'Designed and deployed lightweight automation tools powered by LLM workflows.',
  },
]

function About({ variant = 'section', isActive = false, revealKey }) {
  const revealRef = useRef(null)
  const shouldReduceMotion = usePrefersReducedMotion()
  const shouldReveal = isActive
  const replayKey = revealKey

  useGsapReveal(revealRef, shouldReveal, shouldReduceMotion, [
    { selector: '.about-reveal', delay: 0.05, stagger: 0.08 },
    { selector: '.about-card', delay: 0.14, stagger: 0.1 },
    { selector: '.about-timeline', delay: 0.18 },
    { selector: '.about-timeline-item', delay: 0.24, stagger: 0.09 },
  ], replayKey)

  return (
    <SectionWrapper id="about" className="bg-white" variant={variant}>
      <div ref={revealRef} className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <div className="flex items-start justify-between gap-4">
            <div className="about-reveal">
              <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-gray-400">Profile</p>
              <h2 className="font-heading text-4xl font-semibold leading-[0.9] tracking-[0.03em] text-[var(--ink-main)] md:text-5xl">
                About
              </h2>
            </div>
          </div>

          <p className="max-w-xl text-lg leading-relaxed text-gray-600">
           I am eager to learn and passionate about gaining important knowledge. I want to improve myself and develop a calm, strategic mindset to handle difficult challenges with care and focus. 

I value independence and control over myself. I use careful thinking and disciplined actions to solve problems, improve systems, and achieve meaningful results.

 My goal is to create lasting change from within, rather than seeking approval from others. working on projects that require careful thinking, a good understanding of human systems, and a strong commitment to excellence and honesty
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { cat: 'Programming', list: 'C, JavaScript, Python' },
              { cat: 'Web Stack', list: 'React, Vue, Express, Django, Node' },
              { cat: 'Tools', list: 'Git, GitHub Projects, Docker' },
              { cat: 'Strengths', list: 'System Thinking, UX Detail, Communication' },
            ].map((item) => (
              <div key={item.cat} className="about-card ink-card rounded-2xl p-5">
                <h4 className="text-[11px] uppercase tracking-[0.2em] text-gray-500">{item.cat}</h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.list}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-timeline ink-card-strong rounded-[1.5rem] p-8 sm:p-10">
          <h3 className="border-b border-[var(--paper-line)] pb-4 font-heading text-3xl font-semibold text-[var(--ink-main)]">
            Timeline
          </h3>

          <div className="morph-timeline mt-8">
            <div className="morph-line" />
            {timelineItems.map((item) => (
              <div key={`${item.title}-${item.period}`} className="about-timeline-item morph-item">
                <div className="morph-dot" />
                <div className="morph-content rounded-xl">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-gray-500">{item.period}</span>
                    <span className="rounded-full border border-gray-200 bg-white/90 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-gray-500">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-heading text-2xl font-semibold leading-tight text-[var(--ink-main)]">{item.title}</h4>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-gray-400">{item.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default About
