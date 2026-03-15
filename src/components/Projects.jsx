import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "../data/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay },
  }),
};

export default function Projects() {
  return (
    <section id="projects" className="bg-gray-900 py-24">
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
            My{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
          <p className="mt-5 text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Some of the applications I have built while learning and solving real-world problems.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(({ title, description, highlight, tech, image, github, demo }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1 * (i + 1)}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gray-800/60 border border-gray-700 hover:border-indigo-500/50 rounded-2xl overflow-hidden flex flex-col transition-colors duration-300 shadow-lg shadow-black/20"
            >
              {/* Project Image */}
              <div className="w-full h-44 bg-gray-700/60 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-indigo-900/40 to-purple-900/40">
                  <span className="text-4xl">🖥️</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <h3 className="text-white font-bold text-lg">{title}</h3>

                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>

                {highlight && (
                  <p className="text-indigo-400 text-xs font-medium bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-3 py-2 leading-relaxed">
                    ⚡ {highlight}
                  </p>
                )}

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mt-auto pt-3">
                  {tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-700 text-gray-300 border border-gray-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-3">
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-xs font-medium transition-colors duration-200"
                  >
                    <FaGithub className="text-sm" /> GitHub
                  </a>
                  {demo ? (
                    <a
                      href={demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors duration-200"
                    >
                      <FaExternalLinkAlt className="text-xs" /> Live Demo
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/40 text-gray-500 text-xs font-medium cursor-not-allowed border border-gray-700">
                      <FaExternalLinkAlt className="text-xs" /> Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
