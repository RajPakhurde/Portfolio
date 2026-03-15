import { motion } from "framer-motion";
import {
  FaJava, FaJs, FaReact, FaNodeJs, FaDocker, FaGitAlt,
  FaHtml5, FaCss3Alt, FaBootstrap, FaDatabase,
} from "react-icons/fa";
import {
  SiCplusplus, SiMysql, SiSqlite, SiSpringboot, SiRedux,
  SiExpress, SiKubernetes, SiPostman, SiVscodium,
} from "react-icons/si";

const categories = [
  {
    label: "Languages",
    color: "from-indigo-500 to-blue-500",
    iconColor: "text-indigo-400",
    skills: [
      { name: "Java",       icon: <FaJava /> },
      { name: "JavaScript", icon: <FaJs /> },
      { name: "C++",        icon: <SiCplusplus /> },
      { name: "SQL",        icon: <FaDatabase /> },
    ],
  },
  {
    label: "Frontend",
    color: "from-cyan-500 to-teal-500",
    iconColor: "text-cyan-400",
    skills: [
      { name: "React.js",       icon: <FaReact /> },
      { name: "Redux Toolkit",  icon: <SiRedux /> },
      { name: "HTML",           icon: <FaHtml5 /> },
      { name: "CSS",            icon: <FaCss3Alt /> },
      { name: "Bootstrap",      icon: <FaBootstrap /> },
    ],
  },
  {
    label: "Backend",
    color: "from-violet-500 to-purple-500",
    iconColor: "text-violet-400",
    skills: [
      { name: "Spring Boot", icon: <SiSpringboot /> },
      { name: "Spring MVC",  icon: <SiSpringboot /> },
      { name: "Node.js",     icon: <FaNodeJs /> },
      { name: "Express.js",  icon: <SiExpress /> },
    ],
  },
  {
    label: "Database",
    color: "from-orange-500 to-amber-500",
    iconColor: "text-orange-400",
    skills: [
      { name: "MySQL",  icon: <SiMysql /> },
      { name: "SQLite", icon: <SiSqlite /> },
    ],
  },
  {
    label: "DevOps / Tools",
    color: "from-pink-500 to-rose-500",
    iconColor: "text-pink-400",
    skills: [
      { name: "Docker",     icon: <FaDocker /> },
      { name: "Kubernetes", icon: <SiKubernetes /> },
      { name: "Git",        icon: <FaGitAlt /> },
      { name: "Postman",    icon: <SiPostman /> },
      { name: "VS Code",    icon: <SiVscodium /> },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="bg-gray-950 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Skills &amp;{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        </motion.div>

        {/* Categories */}
        <div className="space-y-12">
          {categories.map(({ label, color, iconColor, skills }, catIdx) => (
            <div key={label}>
              {/* Category Label */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.05 * catIdx}
                className="flex items-center gap-3 mb-5"
              >
                <span className={`h-0.5 w-6 rounded-full bg-gradient-to-r ${color}`} />
                <h3 className="text-gray-300 font-semibold text-sm uppercase tracking-widest">
                  {label}
                </h3>
              </motion.div>

              {/* Skill Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {skills.map(({ name, icon }, i) => (
                  <motion.div
                    key={name}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.05 * catIdx + 0.06 * i}
                    whileHover={{ scale: 1.06 }}
                    className="bg-gray-800/60 border border-gray-700 hover:border-indigo-500/50 rounded-xl p-4 flex flex-col items-center gap-3 cursor-default transition-colors duration-300"
                  >
                    <span className={`text-3xl ${iconColor}`}>
                      {icon}
                    </span>
                    <span className="text-gray-300 text-xs font-medium text-center">{name}</span>
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
