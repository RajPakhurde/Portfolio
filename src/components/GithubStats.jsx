import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { FaCodeBranch, FaFire, FaCode } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

const stats = [
  {
    icon: <FaCodeBranch className="text-indigo-400 text-xl" />,
    title: "Repositories",
    value: "20+",
    bg: "from-indigo-500/10 to-indigo-500/5",
    border: "border-indigo-500/20",
  },
  {
    icon: <FaFire className="text-purple-400 text-xl" />,
    title: "Contributions",
    value: "500+",
    bg: "from-purple-500/10 to-purple-500/5",
    border: "border-purple-500/20",
  },
  {
    icon: <FaCode className="text-pink-400 text-xl" />,
    title: "Top Languages",
    value: "Java · JS · SQL",
    bg: "from-pink-500/10 to-pink-500/5",
    border: "border-pink-500/20",
  },
];

const calendarTheme = {
  dark: ["#1f2937", "#312e81", "#4338ca", "#6366f1", "#a5b4fc"],
};

export default function GithubStats() {
  return (
    <section id="github" className="bg-gray-900 py-24">
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
            GitHub{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Activity
            </span>
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
          <p className="mt-5 text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            A snapshot of my coding activity and contributions.
          </p>
        </motion.div>

        {/* Contribution Calendar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.15}
          className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 sm:p-8 mb-10 overflow-x-auto"
        >
          <div className="min-w-[600px] sm:min-w-0 flex justify-center">
            <GitHubCalendar
              username="RajPakhurde"
              theme={calendarTheme}
              colorScheme="dark"
              blockSize={13}
              blockMargin={4}
              fontSize={12}
            />
          </div>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map(({ icon, title, value, bg, border }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1 * (i + 1)}
              whileHover={{ scale: 1.04 }}
              className={`bg-gradient-to-br ${bg} border ${border} rounded-xl p-6 flex items-center gap-4 transition-shadow duration-300 hover:shadow-lg hover:shadow-indigo-500/10`}
            >
              <div className="w-11 h-11 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                {icon}
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">{title}</p>
                <p className="text-white font-bold text-lg">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
