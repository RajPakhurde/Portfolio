import { motion } from "framer-motion";
import {
  FaJava, FaJs, FaReact, FaNodeJs, FaDocker, FaGitAlt,
  FaHtml5, FaCss3Alt, FaBootstrap, FaDatabase, FaGithub, FaServer
} from "react-icons/fa";
import {
  SiMysql, SiSqlite, SiSpringboot, SiRedux,
  SiExpress, SiPostman, SiVscodium,
  SiSharp, SiDotnet, SiRabbitmq, SiHibernate, SiSwagger
} from "react-icons/si";
import SpotlightCard from "./SpotlightCard";

const categories = [
  {
    label: "Languages",
    color: "from-accent to-blue-500",
    iconColor: "text-accent",
    skills: [
      { name: "Java",       icon: <FaJava /> },
      { name: "JavaScript", icon: <FaJs /> },
      { name: "C#",         icon: <SiSharp /> },
      { name: "SQL",        icon: <FaDatabase /> },
     
    ],
  },
  {
    label: "Frontend",
    color: "from-cyan-500 to-indigo-500",
    iconColor: "text-cyan-400",
    skills: [
      { name: "React.js",       icon: <FaReact /> },
      { name: "Redux Toolkit",  icon: <SiRedux /> },
      { name: "Bootstrap",      icon: <FaBootstrap /> },
      { name: "HTML",       icon: <FaHtml5 /> },
      { name: "CSS",        icon: <FaCss3Alt /> },
    ],
  },
  {
    label: "Backend",
    color: "from-purple-500 to-accent",
    iconColor: "text-purple-400",
    skills: [
      { name: "Spring Boot",   icon: <SiSpringboot /> },
      { name: ".NET Core",     icon: <SiDotnet /> },
      // { name: "Microservices", icon: <FaServer /> },
      { name: "Node.js",       icon: <FaNodeJs /> },
      { name: "Express.js",    icon: <SiExpress /> },
      { name: "Hibernate",     icon: <SiHibernate /> },
    ],
  },
  {
    label: "Databases & Messaging",
    color: "from-orange-500 to-yellow-500",
    iconColor: "text-orange-400",
    skills: [
      { name: "MySQL",    icon: <SiMysql /> },
      { name: "SQLite",   icon: <SiSqlite /> },
      { name: "RabbitMQ", icon: <SiRabbitmq /> },
    ],
  },
  {
    label: "Tools & Technologies",
    color: "from-pink-500 to-accent",
    iconColor: "text-pink-400",
    skills: [
      { name: "Docker",   icon: <FaDocker /> },
      { name: "Git",      icon: <FaGitAlt /> },
      { name: "GitHub",   icon: <FaGithub /> },
      { name: "Postman",  icon: <SiPostman /> },
      { name: "Swagger",  icon: <SiSwagger /> },
      { name: "VS Code",  icon: <SiVscodium /> },
    ],
  },
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

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative z-10 bg-transparent">
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
              Skills
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif font-semibold tracking-tight bg-gradient-to-b from-foreground via-foreground/95 to-foreground/70 bg-clip-text text-transparent">
            Skills &amp;{" "}
            <span className="bg-gradient-to-r from-accent via-accent-bright to-accent bg-clip-text text-transparent animate-shimmer">
              Technologies
            </span>
          </h2>
          <div className="mt-4 mx-auto w-12 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        </motion.div>

        {/* Categories */}
        <div className="space-y-16">
          {categories.map(({ label, color, iconColor, skills }, catIdx) => (
            <div key={label} className="space-y-6">
              {/* Category Label */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={0.05 * catIdx}
                className="flex items-center gap-3"
              >
                <span className={`h-[2px] w-6 rounded-full bg-gradient-to-r ${color}`} />
                <h3 className="text-foreground-subtle font-mono text-xs uppercase tracking-widest font-semibold">
                  {label}
                </h3>
              </motion.div>

              {/* Skill Cards */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                {skills.map(({ name, icon }, i) => (
                  <motion.div
                    key={name}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    custom={0.05 * catIdx + 0.03 * i}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <SpotlightCard className="p-2.5 cursor-default">
                      <div className="flex flex-col items-center gap-1.5 w-full h-full justify-center py-1">
                        <span className={`text-xl sm:text-2xl ${iconColor} transition-transform duration-300 group-hover:scale-110`}>
                          {icon}
                        </span>
                        <span className="text-foreground-muted text-[10px] sm:text-xs font-medium text-center font-sans tracking-wide">
                          {name}
                        </span>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
