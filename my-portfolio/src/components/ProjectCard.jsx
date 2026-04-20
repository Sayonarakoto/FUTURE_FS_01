import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <div className={`relative h-[75vh] w-[60vw] max-w-3xl shrink-0 ${project.color} p-8 rounded-sm border border-ink-line shadow-ink`}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <p className="font-inkSerif text-8xl text-ink-base/10 absolute -top-8 -left-4 select-none">
            {project.id}
          </p>
          <p className="text-sm uppercase tracking-widest text-ink-soft">
            {project.type}
          </p>
          <h3 className="font-inkSerif text-4xl font-bold text-ink-base mt-2">
            {project.title}
          </h3>
        </div>
        <p className="text-lg text-ink-soft max-w-md">
          {project.desc}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;