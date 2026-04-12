import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import linkedinPhoto from '../../assets/linkedin.png'

const easeEditorial = [0.22, 1, 0.36, 1]
const heroName = 'AB NAJEEB RAHMAN'

function Hero() {
  const nameRef = useRef(null)
  const portraitRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return undefined

    const ctx = gsap.context(() => {
      const chars = nameRef.current?.querySelectorAll('.ink-reveal-char') ?? []

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 14,
          filter: 'blur(5px)',
          clipPath: 'inset(0 0 100% 0)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.7,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.3,
        },
      )

      gsap.fromTo(
        portraitRef.current,
        { opacity: 0, scale: 1.03 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out', delay: 0.15 },
      )
    }, nameRef)

    return () => ctx.revert()
  }, [shouldReduceMotion])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: easeEditorial,
      },
    },
  }

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20 sm:pt-0">
      {/* Stationery Accents */}
      <div className="absolute left-[5%] top-[15%] h-[1px] w-32 bg-[var(--paper-line)] mix-blend-multiply opacity-40 rotate-12" />
      <div className="absolute right-[10%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-[var(--ink-muted)] mix-blend-multiply opacity-20" />
      <div className="absolute left-[40%] bottom-[10%] h-[1px] w-64 bg-[var(--paper-line-soft)] mix-blend-multiply opacity-30 -rotate-6" />

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-12 items-center gap-12">
          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-10">
              {/* Horizontal Editorial Name */}
              <div ref={nameRef} className="relative z-10 flex select-none">
                <h1 aria-label={heroName} className="hero-name flex flex-wrap gap-x-[0.25em]">
                  {heroName.split(' ').map((word, wIdx) => (
                    <span key={`word-${wIdx}`} className="inline-flex">
                      {word.split('').map((char, cIdx) => (
                        <span key={`char-${cIdx}`} aria-hidden="true" className="ink-reveal-char ink-stroke font-mybrush">
                          {char}
                        </span>
                      ))}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Content & CTA */}
              <div className="flex flex-col gap-10">
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="space-y-4">
                    <p className="hero-vertical-sub ink-seal">Summary</p>
                    <p className="max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)] sm:text-xl">
                     Works independently, pays attention to detail, and focuses on learning by doing things properly. As a recent graduate, looking for opportunities to apply problem-solving skills, improve technical abilities, and contribute to meaningful work while continuing to grow with consistency and discipline.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-5">
                    <a href="#projects" className="editorial-cta">
                      View Work
                    </a>
                    <a href="#contact" className="editorial-cta editorial-cta--secondary">
                      Get in Touch
                    </a>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-[var(--paper-line)]" />
                  <span className="text-[9px] uppercase tracking-[0.6em] text-[var(--ink-muted)]">
                    Palakkad, Kerala
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Portrait Panel */}
          <div className="col-span-12 lg:col-span-4">
            <div
              ref={portraitRef}
              className="paper-elevate relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2px] border border-[var(--paper-line)] bg-white p-2 lg:ml-auto"
            >
              <div className="relative h-full w-full overflow-hidden bg-slate-50">
                <img
                  src={linkedinPhoto}
                  alt="A B Najeeb Rahman portrait"
                  className="h-full w-full object-cover grayscale-[0.35] transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
              </div>

              {/* Portrait Accent Labels */}
              <div className="absolute -right-4 top-1/4 translate-x-full">
                <p className="text-[8px] uppercase tracking-[0.5em] text-[var(--ink-muted)]">
                  VER: 2026.04
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
