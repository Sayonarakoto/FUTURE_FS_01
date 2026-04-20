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
  const wheelLockRef = useRef(false);
  const wheelTimeoutRef = useRef(0);
  const isScrollingRef = useRef(false);

  const scrollToIndex = (index, immediate = false) => {
    const railEl = railRef.current;
    const clamped = Math.min(Math.max(index, 0), sections.length - 1);
    if (!railEl) return;
    setActiveIndex(clamped);
    isScrollingRef.current = true;
    railEl.scrollTo({
      left: clamped * railEl.clientWidth,
      behavior: immediate ? 'auto' : 'smooth',
    });

    window.clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = window.setTimeout(() => {
      isScrollingRef.current = false;
    }, immediate ? 0 : 700);
  };

  useEffect(() => {
    const railEl = railRef.current;
    if (!railEl) return;

    const updateActive = () => {
      const next = Math.round(railEl.scrollLeft / railEl.clientWidth);
      setActiveIndex(next);
    };

    const onWheel = (event) => {
      // Let the browser handle zoom, horizontal gesture, and modifier-based scrolling.
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (wheelLockRef.current || isScrollingRef.current) return;

      event.preventDefault();
      wheelLockRef.current = true;

      const direction = event.deltaY > 0 ? 1 : -1;
      scrollToIndex(activeIndex + direction);

      window.clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 550);
    };

    railEl.addEventListener('scroll', updateActive, { passive: true });
    railEl.addEventListener('wheel', onWheel, { passive: false });
    updateActive();

    return () => {
      railEl.removeEventListener('scroll', updateActive);
      railEl.removeEventListener('wheel', onWheel);
      window.clearTimeout(wheelTimeoutRef.current);
    };
  }, [activeIndex]);

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
            <Hero variant="panel" onNavigate={onNavigate} isActive={activeIndex === 0} revealKey={activeIndex} />
          </section>
          <section className="h-full w-screen shrink-0">
            <Projects variant="panel" onNavigate={onNavigate} isActive={activeIndex === 1} revealKey={activeIndex} />
          </section>
          <section className="h-full w-screen shrink-0">
            <About variant="panel" isActive={activeIndex === 2} revealKey={activeIndex} />
          </section>
          <section className="h-full w-screen shrink-0">
            <Contact variant="panel" isActive={activeIndex === 3} revealKey={activeIndex} />
          </section>
        </div>
      </div>

      {/* Navigation dots/buttons */}
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
    isDesktop ? (
      <DesktopHorizontalApp />
    ) : (
      <ReactLenis root options={{ orientation: 'vertical', smoothWheel: true }}>
        <MobileVerticalApp />
      </ReactLenis>
    )
  );
}
