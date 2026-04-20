import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import linkedinPhoto from '../../assets/linkedin.png';
import { TegakiRenderer } from 'tegaki';
import yujiSyukuFont from '../../assets/yuji-syuku/bundle.ts';

const easeEditorial = [0.22, 1, 0.36, 1];
const heroName = 'A B Najeeb Rahman';

function Hero({ variant = 'section', onNavigate }) {
  const heroRef = useRef(null);
  const portraitRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isPanel = variant === 'panel';

  const handleNavigate = (event, href) => {
    if (!onNavigate || !href?.startsWith('#')) return
    event.preventDefault()
    onNavigate(href)
  }

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        portraitRef.current,
        { opacity: 0, scale: 1.06, x: 30, filter: 'blur(18px)' },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1.3,
          ease: 'power3.out',
          delay: 1.6,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.12,
      },
    },
  };

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
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className={`relative flex items-center overflow-hidden bg-white bg-grid px-6 ${
        isPanel ? 'h-full min-h-0 pb-16 pt-28 sm:pb-20 lg:pt-24' : 'min-h-screen pt-20 sm:pt-0'
      }`}
    >
      <div className="absolute left-[5%] top-[15%] h-[1px] w-32 rotate-12 bg-[var(--paper-line)] opacity-40 mix-blend-multiply" />
      <div className="absolute bottom-[20%] right-[10%] h-1.5 w-1.5 rounded-full bg-[var(--ink-muted)] opacity-20 mix-blend-multiply" />
      <div className="absolute bottom-[10%] left-[40%] h-[1px] w-64 -rotate-6 bg-[var(--paper-line-soft)] opacity-30 mix-blend-multiply" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-7xl"
      >
        <div className="grid grid-cols-12 items-center gap-12">
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-10">
              <motion.div variants={itemVariants} className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--slate-accent)]">
                  Talented Technocrat
                </p>
                <p className="max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)] sm:text-xl">
               Diploma graduate in Computer Engineering with a strong interest in software development. Currently a fresher, actively building coding skills with a focus on practical learning and problem-solving. Approaches programming as a continuous discovery process, with a mindset oriented toward experimentation, logic building, and iterative improvement. Familiar with core programming concepts and working toward applying them in real-world projects.
                </p>
              </motion.div>

              <div className="ink-container relative z-10 flex select-none bg-transparent">
                <div className="hero-name text-5xl md:text-7xl">
                  <TegakiRenderer font={yujiSyukuFont} duration={4000} delay={1000}>
                    {heroName}
                  </TegakiRenderer>
                </div>
              </div>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
                <a href="#projects" onClick={(event) => handleNavigate(event, '#projects')} className="editorial-cta">
                  View Work
                </a>
                <a
                  href="#contact"
                  onClick={(event) => handleNavigate(event, '#contact')}
                  className="editorial-cta editorial-cta--secondary"
                >
                  Get in Touch
                </a>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-[var(--paper-line)]" />
                <span className="text-[9px] uppercase tracking-[0.6em] text-[var(--ink-muted)]">
                  Palakkad, Kerala
                </span>
              </motion.div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div
              ref={portraitRef}
              className="paper-elevate character-mask character-glow relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2px] border border-[var(--paper-line)] bg-white p-2 lg:ml-auto"
            >
              <div className="relative h-full w-full overflow-hidden bg-slate-50">
                <img
                  src={linkedinPhoto}
                  alt="A B Najeeb Rahman portrait"
                  className="h-full w-full object-cover grayscale-[0.35] transition-transform duration-700 hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
              </div>

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
  );
}

export default Hero;
