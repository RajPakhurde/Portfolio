import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaAward } from "react-icons/fa";
import SpotlightCard from "./SpotlightCard";

const timelineData = [
  {
    title: "Bachelor of Engineering",
    institution: "G.M Vedak Institute of Technology",
    date: "2021 - 2025",
    icon: <FaGraduationCap />,
    desc: "Computer Engineering (CGPA: 8.17, Dept Rank 2nd).",
    position: "above"
  },
  {
    title: "PG Diploma in Advanced Computing",
    institution: "Sunbeam Institute (CDAC)",
    date: "2025 - 2026",
    icon: <FaAward />,
    desc: "Grade: A. Module Topper in Web Programming Technologies.",
    position: "below"
  },
  {
    title: "Software Development Intern",
    institution: "GRPTechs",
    date: "Apr – Jun 2026",
    icon: <FaBriefcase />,
    desc: "Built a SaaS business-rule manager using Camunda, Node.js, and React.",
    position: "above"
  }
];

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

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative z-10 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          className="flex flex-col items-center mb-16"
        >
          {/* Badge Label */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/20 dark:border-accent/30 bg-accent/5 px-4 py-1.5 mb-4">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent font-semibold">
              Journey
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif font-semibold tracking-tight bg-gradient-to-b from-foreground via-foreground/95 to-foreground/70 bg-clip-text text-transparent">
            Experience &amp;{" "}
            <span className="bg-gradient-to-r from-accent via-accent-bright to-accent bg-clip-text text-transparent animate-shimmer">
              Education
            </span>
          </h2>
          <div className="mt-4 mx-auto w-12 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        </motion.div>

        {/* ========================================================
            DESKTOP VIEW: HORIZONTAL ALTERNATING TIMELINE
            ======================================================== */}
        <div className="hidden md:block relative w-full py-12">
          {/* The Horizontal Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-border-default via-accent/40 to-border-default -translate-y-1/2 z-0" />
          
          {/* The Grid layout for alternating nodes */}
          <div className="grid grid-cols-3 gap-4 relative z-10">
            {timelineData.map((item, index) => {
              const isAbove = item.position === "above";
              return (
                <div key={index} className="flex flex-col items-center relative">
                  
                  {/* Top Zone */}
                  <div className={`h-[160px] flex items-end justify-center w-full pb-4 ${isAbove ? "" : "opacity-0 pointer-events-none"}`}>
                    {isAbove && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="w-full max-w-[240px]"
                      >
                        <SpotlightCard className="p-4 flex flex-col gap-1 text-left relative">
                          <span className="text-[9px] font-mono text-accent uppercase tracking-wider">{item.date}</span>
                          <h4 className="text-foreground font-bold text-xs sm:text-sm line-clamp-1">{item.title}</h4>
                          <p className="text-foreground-muted text-[10px] line-clamp-1">{item.institution}</p>
                          <p className="text-foreground-subtle text-[10px] mt-1.5 leading-relaxed">{item.desc}</p>
                          
                          {/* Down connector dot indicator */}
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-bg-elevated border border-border-default flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          </div>
                        </SpotlightCard>
                      </motion.div>
                    )}
                  </div>

                  {/* Midline point */}
                  <div className="h-10 flex items-center justify-center relative my-2">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
                      className="w-8 h-8 rounded-full bg-surface border border-border-default flex items-center justify-center shadow-md text-accent z-10 hover:border-accent hover:scale-110 transition-transform duration-300"
                    >
                      <span className="text-xs">{item.icon}</span>
                    </motion.div>
                  </div>

                  {/* Bottom Zone */}
                  <div className={`h-[160px] flex items-start justify-center w-full pt-4 ${!isAbove ? "" : "opacity-0 pointer-events-none"}`}>
                    {!isAbove && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="w-full max-w-[240px]"
                      >
                        <SpotlightCard className="p-4 flex flex-col gap-1 text-left relative">
                          {/* Up connector dot indicator */}
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-bg-elevated border border-border-default flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          </div>
                          
                          <span className="text-[9px] font-mono text-accent uppercase tracking-wider">{item.date}</span>
                          <h4 className="text-foreground font-bold text-xs sm:text-sm line-clamp-1">{item.title}</h4>
                          <p className="text-foreground-muted text-[10px] line-clamp-1">{item.institution}</p>
                          <p className="text-foreground-subtle text-[10px] mt-1.5 leading-relaxed">{item.desc}</p>
                        </SpotlightCard>
                      </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            MOBILE VIEW: VERTICAL TIMELINE
            ======================================================== */}
        <div className="md:hidden relative pl-6 space-y-6">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-2.5 w-[2px] bg-gradient-to-b from-accent/30 via-accent/10 to-transparent" />
          
          {timelineData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative"
            >
              {/* Point on the line */}
              <div className="absolute left-[-21px] top-4 w-6 h-6 rounded-full bg-surface border border-border-default flex items-center justify-center text-[10px] text-accent z-10">
                {item.icon}
              </div>

              <SpotlightCard className="p-4 flex flex-col gap-1 text-left">
                <span className="text-[9px] font-mono text-accent uppercase tracking-wider">{item.date}</span>
                <h4 className="text-foreground font-bold text-xs sm:text-sm">{item.title}</h4>
                <p className="text-foreground-muted text-[10px]">{item.institution}</p>
                <p className="text-foreground-subtle text-[10px] mt-1 leading-relaxed">{item.desc}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
