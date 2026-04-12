import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LenisWrapper from './components/LenisWrapper'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import About from './components/sections/About'
import Contact from './components/sections/Contact'

function App() {
  return (
    <div className="horimiya-canvas min-h-screen relative z-0 text-[var(--ink-main)]">
      <div className="relative z-10">
        <Navbar />

        <LenisWrapper>
          <main className="relative z-10">
            <Hero />
            <Projects />
            <About />
            <Contact />
          </main>
        </LenisWrapper>
        <Footer />
      </div>
    </div>
  )
}

export default App
