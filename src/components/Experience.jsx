import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaAward } from "react-icons/fa";
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

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative z-10 bg-transparent">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Experience (lg:col-span-7) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.1}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-surface border border-border-default flex items-center justify-center shadow-inner-highlight text-accent">
                <FaBriefcase className="text-sm" />
              </div>
              <h3 className="text-foreground-subtle font-mono text-xs uppercase tracking-widest font-semibold">
                Internship Experience
              </h3>
            </div>

            <SpotlightCard className="p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-default pb-5">
                <div>
                  <h4 className="text-foreground font-semibold text-lg sm:text-xl">Software Development Intern</h4>
                  <p className="text-accent text-sm font-semibold mt-1">GRPTechs</p>
                </div>
                <div className="text-left sm:text-right space-y-1 font-mono text-xs text-foreground-subtle">
                  <p className="font-semibold text-foreground-muted">April 2026 – June 2026</p>
                  <p>Raigad, Maharashtra</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface border border-border-default text-foreground-subtle">Node.js</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface border border-border-default text-foreground-subtle">React.js</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface border border-border-default text-foreground-subtle">Camunda DMN/BPMN</span>
                </div>

                <ul className="list-none space-y-3.5 text-foreground-muted text-sm sm:text-base leading-relaxed">
                  <li className="flex gap-2.5 items-start">
                    <span className="text-accent mt-2 flex-shrink-0">•</span>
                    <span>Built a full-stack SaaS platform providing a user-friendly interface for creating and managing business rules on top of the open-source Camunda Rule Engine (v7), replacing its limited native modeler for end users.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-accent mt-2 flex-shrink-0">•</span>
                    <span>Designed a Node.js middleware layer to securely proxy and protect Camunda’s public rule-evaluation APIs, adding an authentication and access-control boundary.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-accent mt-2 flex-shrink-0">•</span>
                    <span>Developed a bulk rule-evaluation feature via Excel upload; implemented multithreading using worker threads to concurrently call Camunda's APIs and reduce execution times.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-accent mt-2 flex-shrink-0">•</span>
                    <span>Built the React.js frontend for rule configuration, input testing, and bulk evaluation workflows.</span>
                  </li>
                </ul>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Right Column: Education & Achievements (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Education Section */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.2}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-surface border border-border-default flex items-center justify-center shadow-inner-highlight text-accent">
                  <FaGraduationCap className="text-sm" />
                </div>
                <h3 className="text-foreground-subtle font-mono text-xs uppercase tracking-widest font-semibold">
                  Education
                </h3>
              </div>

              <div className="space-y-6">
                {/* CDAC */}
                <SpotlightCard className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <h4 className="text-foreground font-semibold text-sm sm:text-base">Post Graduate Diploma in Advanced Computing</h4>
                      <p className="text-foreground-muted text-xs font-medium">Sunbeam Institute of Information Technology (CDAC)</p>
                      <p className="text-accent text-xs font-semibold pt-1">Grade: A</p>
                    </div>
                    <span className="text-[10px] font-mono text-foreground-subtle bg-surface border border-border-default px-2 py-0.5 rounded flex-shrink-0">
                      2025 - 2026
                    </span>
                  </div>
                </SpotlightCard>

                {/* BE */}
                <SpotlightCard className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <h4 className="text-foreground font-semibold text-sm sm:text-base">Bachelor of Engineering in Computer Engineering</h4>
                      <p className="text-foreground-muted text-xs font-medium">G.M Vedak Institute of Technology, Mumbai University</p>
                      <p className="text-accent text-xs font-semibold pt-1">CGPA: 8.17</p>
                    </div>
                    <span className="text-[10px] font-mono text-foreground-subtle bg-surface border border-border-default px-2 py-0.5 rounded flex-shrink-0">
                      2021 - 2025
                    </span>
                  </div>
                </SpotlightCard>
              </div>
            </motion.div>

            {/* Achievements Section */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.3}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-surface border border-border-default flex items-center justify-center shadow-inner-highlight text-accent">
                  <FaAward className="text-sm" />
                </div>
                <h3 className="text-foreground-subtle font-mono text-xs uppercase tracking-widest font-semibold">
                  Achievements
                </h3>
              </div>

              <SpotlightCard className="p-6 space-y-4">
                <ul className="list-none space-y-3.5 text-foreground-muted text-sm leading-relaxed">
                  <li className="flex gap-2.5 items-start">
                    <span className="text-accent mt-2 flex-shrink-0">•</span>
                    <span>Module Topper in Web Programming Technologies during PG-DAC at Sunbeam Institute (CDAC).</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-accent mt-2 flex-shrink-0">•</span>
                    <span>Secured 2nd position in Computer Engineering department with CGPA of 8.17.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-accent mt-2 flex-shrink-0">•</span>
                    <span>Volunteered at Swadesh Foundation for health camps and educational outreach programs.</span>
                  </li>
                </ul>
              </SpotlightCard>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
