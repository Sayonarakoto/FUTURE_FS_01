import PropTypes from 'prop-types'

function SectionWrapper({ children, id, className = '', variant = 'section' }) {
  const isPanel = variant === 'panel'

  return (
    <section
      id={id}
      className={`relative flex bg-white ${
        isPanel
          ? 'h-full min-h-0 items-start px-8 pb-14 pt-28 sm:px-10 lg:px-14 lg:pt-24'
          : 'min-h-screen items-center px-8 py-16 sm:px-10 lg:px-14'
        } ${className}`}
    >
      <div aria-hidden className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-gray-200 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

SectionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['section', 'panel']),
}

export default SectionWrapper
