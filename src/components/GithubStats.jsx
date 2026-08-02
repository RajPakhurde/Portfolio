import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { FaCodeBranch, FaFire, FaCode } from "react-icons/fa";
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

const stats = [
  {
    icon: <FaCodeBranch className="text-accent text-xl" />,
    title: "Repositories",
    value: "20+",
  },
  {
    icon: <FaFire className="text-indigo-400 dark:text-indigo-400 text-xl" />,
    title: "Contributions",
    value: "500+",
  },
  {
    icon: <FaCode className="text-purple-400 dark:text-purple-400 text-xl" />,
    title: "Top Languages",
    value: "Java · JS · SQL",
  },
];

// Dual-theme calendar palettes
const calendarTheme = {
  light: ["#ebedf0", "#cbd5e1", "#60a5fa", "#3b82f6", "#0052FF"],
  dark: ["#121217", "#222547", "#393e75", "#5158a6", "#6872D9"],
};

export default function GithubStats({ theme }) {
  return (
    <section id="github" className="py-32 relative z-10 bg-transparent">
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
              Activity
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif font-semibold tracking-tight bg-gradient-to-b from-foreground via-foreground/95 to-foreground/70 bg-clip-text text-transparent">
            GitHub{" "}
            <span className="bg-gradient-to-r from-accent via-accent-bright to-accent bg-clip-text text-transparent animate-shimmer">
              Activity
            </span>
          </h2>
          <div className="mt-4 mx-auto w-12 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <p className="mt-4 text-foreground-muted text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed text-center">
            A snapshot of my coding activity and contributions.
          </p>
        </motion.div>

        {/* Contribution Calendar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.1}
          className="mb-10"
        >
          <SpotlightCard className="p-6 sm:p-8 overflow-x-auto">
            <div className="min-w-[600px] sm:min-w-0 flex justify-center">
              <GitHubCalendar
                username="RajPakhurde"
                theme={calendarTheme}
                colorScheme={theme === "dark" ? "dark" : "light"}
                blockSize={13}
                blockMargin={4}
                fontSize={12}
              />
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map(({ icon, title, value }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={0.08 * (i + 1)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <SpotlightCard className="p-6 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-surface border border-border-default flex items-center justify-center flex-shrink-0 shadow-inner-highlight">
                  {icon}
                </div>
                <div className="space-y-0.5">
                  <p className="text-foreground-subtle text-[10px] font-mono uppercase tracking-wider font-semibold">{title}</p>
                  <p className="text-foreground font-semibold text-lg">{value}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
