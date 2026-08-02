import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import SpotlightCard from "./SpotlightCard";

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

export default function ProjectCard({ 
  title, 
  description, 
  highlight, 
  tech, 
  image, 
  github, 
  demo, 
  index, 
  className = "" 
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={0.08 * (index + 1)}
      className={`flex flex-col h-full ${className}`}
    >
      <SpotlightCard className="flex flex-col h-full border-gradient-hover group">
        
        {/* Project Image Container */}
        <div className="w-full h-48 bg-bg-deep relative overflow-hidden border-b border-border-default">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover filter brightness-[0.9] dark:brightness-[0.8] hover:brightness-[0.98] transition-all duration-700 ease-out group-hover:scale-102"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-indigo-950/20 to-purple-950/20">
            <span className="text-4xl filter drop-shadow-[0_0_15px_rgba(94,106,210,0.5)]">🖥️</span>
          </div>
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-bg-base/30 to-transparent" />
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1 p-6 sm:p-7 gap-4">
          <div className="space-y-2">
            <h3 className="text-foreground font-semibold text-lg sm:text-xl tracking-tight transition-colors duration-300 group-hover:text-accent">
              {title}
            </h3>
            <p className="text-foreground-muted text-xs sm:text-sm leading-relaxed font-sans font-normal">
              {description}
            </p>
          </div>

          {highlight && (
            <div className="relative overflow-hidden text-accent text-xs font-semibold bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 leading-relaxed shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]">
              <span className="relative z-10">⚡ {highlight}</span>
            </div>
          )}

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border-default">
            {tech.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md bg-surface text-foreground-subtle border border-border-default shadow-inner-highlight"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-bg-elevated hover:bg-surface-hover text-foreground hover:text-accent border border-border-default hover:border-border-hover text-xs font-semibold transition-all duration-300 shadow-inner-highlight hover:shadow-card-hover"
            >
              <FaGithub className="text-sm" /> GitHub
            </a>
            
            {demo ? (
              <a
                href={demo}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-bright text-white text-xs font-semibold transition-all duration-300 shadow-button-primary hover:shadow-button-primary-hover"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaExternalLinkAlt className="text-[10px]" /> Live Demo
                </span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </a>
            ) : (
              <span className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface text-foreground-subtle/40 border border-border-default text-xs font-semibold cursor-not-allowed select-none">
                <FaExternalLinkAlt className="text-[10px] opacity-40" /> Coming Soon
              </span>
            )}
          </div>
        </div>

      </SpotlightCard>
    </motion.div>
  );
}
