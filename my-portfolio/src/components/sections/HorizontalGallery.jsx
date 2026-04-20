import { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import ProjectCard from '../ProjectCard';

const projects = [
  {
    id: "01",
    title: "Gen-C Ecosystem",
    type: "MERN Stack / Paperless",
    desc: "A digital transformation of campus operations.",
    color: "bg-purple-50"
  },
  {
    id: "02",
    title: "Nexus Access",
    type: "express.js / Secure Auth",
    desc: "SSO OTP Login . dashboard for leads managmement.",
    color: "bg-blue-50"
  },
  {
    id: "03",
    title: "I-leave",
    type: "Staff Management / React",
    desc: "webapp for automated staff management and leave processing.",
    color: "bg-slate-50"
  }
];

export default function HorizontalGallery() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-transparent">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        <motion.div 
          style={{ x: useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]) }}
          className="absolute top-1/2 left-0 -translate-y-1/2 text-[30vw] font-inkSerif text-ink-base/5 select-none pointer-events-none"
        >
          WORKS
        </motion.div>

        <motion.div style={{ x }} className="flex gap-32 px-[10vw]">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          
          <div className="w-[20vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
