import { useEffect, useRef, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';

function DesktopHorizontalApp() {
  const sections = ['home', 'projects', 'about', 'contact'];
  const railRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index, immediate = false) => {
    const railEl = railRef.current;
    const clamped = Math.min(Math.max(index, 0), sections.length - 1);
    if (!railEl) return;
    railEl.scrollTo({
      left: clamped * railEl.clientWidth,
      behavior: immediate ? 'auto' : 'smooth',
    });
  };

  useEffect(() => {
    const railEl = railRef.current;
    if (!railEl) return;

    const updateActive = () => {
      const next = Math.round(railEl.scrollLeft / railEl.clientWidth);
      setActiveIndex(next);
    };

    const onWheel = (event) => {
      // Prevent scrolling if modifier keys are pressed or if it's primarily vertical scroll
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      
      event.preventDefault();
      railEl.scrollLeft += event.deltaY;
    };

    railEl.addEventListener('scroll', updateActive, { passive: true });
    railEl.addEventListener('wheel', onWheel, { passive: false });
    updateActive();

    return () => {
      railEl.removeEventListener('scroll', updateActive);
      railEl.removeEventListener('wheel', onWheel);
    };
  }, []);

  const onNavigate = (href) => {
    const id = href.replace('#', '');
    const index = sections.indexOf(id);
    if (index !== -1) scrollToIndex(index);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      <Navbar onNavigate={onNavigate} />

      <div
        ref={railRef}
        className="hide-scrollbar h-full overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth"
        style={{ WebkitOverflowScrolling: 'touch' }} // For smoother scrolling on iOS
      >
        <div style={{ width: `${sections.length * 100}vw` }} className="flex h-full">
          <section className="h-full w-screen shrink-0">
            <Hero variant="panel" onNavigate={onNavigate} />
          </section>
          <section className="h-full w-screen shrink-0">
            <Projects alwaysVisible variant="panel" onNavigate={onNavigate} />
          </section>
          <section className="h-full w-screen shrink-0">
            <About alwaysVisible variant="panel" />
          </section>
          <section className="h-full w-screen shrink-0">
            <Contact alwaysVisible variant="panel" />
          </section>
        </div>
      </div>

      {/* Navigation dots/buttons */}
      <div className="pointer-events-none fixed inset-x-0 bottom-8 z-40 hidden justify-center lg:flex">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-slate-200/70 bg-white/85 px-4 py-2 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous section"
          >
            ◀
          </button>

          <div className="min-w-40 text-center text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-700">
            {sections[activeIndex]}
          </div>

          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === sections.length - 1}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next section"
          >
            ▶
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function MobileVerticalApp() {
  return (
    <div className="horimiya-canvas relative z-0 min-h-screen text-[var(--ink-main)]">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1024px)').matches
      : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(min-width: 1024px)');
    const handleChange = (event) => setIsDesktop(event.matches);

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  return (
    <ReactLenis root options={{ orientation: 'vertical', smoothWheel: true }}>
      {isDesktop ? <DesktopHorizontalApp /> : <MobileVerticalApp />}
    </ReactLenis>
  );
}
