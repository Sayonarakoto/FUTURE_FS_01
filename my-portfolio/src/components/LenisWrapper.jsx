import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Lenis from 'lenis'

function LenisWrapper({ children }) {
  const rafRef = useRef(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    const raf = (time) => {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafRef.current)
      lenis.destroy()
    }
  }, [])

  return <div className="relative">{children}</div>
}

LenisWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LenisWrapper
