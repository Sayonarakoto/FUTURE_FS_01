import { useRef } from 'react'
import PropTypes from 'prop-types'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

export const sectionChildVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 130,
      damping: 20,
      mass: 0.8,
    },
  },
}

function SectionWrapper({ children, id, className = '' }) {
  const ref = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { amount: 0.3, once: true })

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={sectionContainerVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate={shouldReduceMotion || isInView ? 'visible' : 'hidden'}
      className={`relative flex min-h-screen items-center bg-gradient-to-br from-white to-slate-50 px-8 py-16 sm:px-10 lg:px-14 ${className}`}
    >
      <div aria-hidden className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-slate-300/50 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">{children}</div>
    </motion.section>
  )
}

SectionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default SectionWrapper
