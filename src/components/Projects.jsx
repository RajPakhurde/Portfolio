import { motion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      delay,
      ease: [0.16, 1, 0.3, 1] 
    },
  }),
};

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative z-10 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          className="flex flex-col items-center mb-20"
        >
          {/* Badge Label */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/20 dark:border-accent/30 bg-accent/5 px-4 py-1.5 mb-4">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent font-semibold">
              Work
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif font-semibold tracking-tight bg-gradient-to-b from-foreground via-foreground/95 to-foreground/70 bg-clip-text text-transparent">
            My{" "}
            <span className="bg-gradient-to-r from-accent via-accent-bright to-accent bg-clip-text text-transparent animate-shimmer">
              Projects
            </span>
          </h2>
          <div className="mt-4 mx-auto w-12 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <p className="mt-4 text-foreground-muted text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed text-center">
            Some of the applications I have built while learning and solving real-world problems.
          </p>
        </motion.div>

        {/* Cards Asymmetric Bento-style Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          {projects.map((project, i) => {
            const colSpan = i === 0 ? "lg:col-span-3" : "lg:col-span-2";
            return (
              <ProjectCard 
                key={project.title} 
                {...project} 
                index={i} 
                className={colSpan}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
