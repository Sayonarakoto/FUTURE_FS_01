import { motion } from 'framer-motion'
import SectionWrapper, { sectionChildVariants } from '../SectionWrapper'

const projects = [
  {
    title: 'GEN-C Resource Management',
    description:
      'MERN resource workflow that replaced manual logs with role approvals, live tracking, and accountable state updates.',
    stack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    previewLink: 'https://sayonarakoto.github.io/Luminous-Hello/',
    sourceLink: 'https://github.com/Sayonarakoto/GEN-C_LOGIN',
  },
  {
    title: 'I-LEAVE Staff Portal',
    description:
      'Leave management platform with Django APIs, Vue interface, and MySQL-backed policy handling across teams.',
    stack: ['Django', 'Vue.js', 'MySQL', 'REST API'],
    previewLink: 'https://i-leave-zeta.vercel.app/',
    sourceLink: 'https://github.com/Sayonarakoto/ASM',
  },
]

function Projects({ alwaysVisible = false, variant = 'section', onNavigate }) {
  const handleNavigate = (event, href) => {
    if (!onNavigate || !href?.startsWith('#')) return
    event.preventDefault()
    onNavigate(href)
  }

  return (
    <SectionWrapper id="projects" className="bg-white bg-grid" alwaysVisible={alwaysVisible} variant={variant}>
      <motion.div variants={sectionChildVariants} className="space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="ink-seal text-[10px] uppercase tracking-[0.4em] text-[var(--slate-accent)]">Projects</p>
            <h2 className="font-heading text-4xl font-semibold leading-[0.9] tracking-[0.03em] text-[var(--ink-main)] md:text-5xl">
              Work
            </h2>
          </div>
          <a
            className="text-xs uppercase tracking-[0.24em] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink-main)]"
            href="#contact"
            onClick={(event) => handleNavigate(event, '#contact')}
          >
            Available for builds
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={sectionChildVariants}
              className="ink-card group relative rounded-[1.25rem] p-7 shadow-sm shadow-slate-200 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="ink-seal mb-6 inline-block text-[10px] uppercase tracking-[0.3em] text-[var(--ink-muted)]">0{index + 1}</span>
              <h3 className="font-heading text-3xl font-semibold leading-tight text-[var(--ink-main)]">{project.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="ink-seal rounded-full border border-[var(--paper-line)] bg-white/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--ink-muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.previewLink && (
                  <a className="editorial-cta" href={project.previewLink} target="_blank" rel="noopener noreferrer">
                    Preview
                  </a>
                )}
                {project.sourceLink && (
                  <a className="editorial-cta editorial-cta--secondary" href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                    Source
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

export default Projects
