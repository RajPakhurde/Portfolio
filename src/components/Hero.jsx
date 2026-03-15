import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-gray-950 flex items-center pt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 flex flex-col-reverse md:flex-row items-center gap-12">

        {/* Left: Text Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-indigo-400 font-medium text-lg mb-2"
          >
            Hi, I'm Raj Pakhurde 👋
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          >
            Full Stack{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Developer
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="mt-4 text-gray-400 text-base sm:text-lg font-mono tracking-wide"
          >
            Java &nbsp;|&nbsp; Spring Boot &nbsp;|&nbsp; React &nbsp;|&nbsp; SQL
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
            className="mt-5 text-gray-400 text-sm sm:text-base max-w-xl mx-auto md:mx-0 leading-relaxed"
          >
            I build scalable full-stack applications and enjoy solving
            real-world problems using modern technologies.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-indigo-500/20"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-lg border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white font-semibold text-sm transition-all duration-200"
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.75}
            className="mt-6 flex gap-5 justify-center md:justify-start"
          >
            <a
              href="https://github.com/rajpakhurde"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white text-2xl transition-colors duration-200"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/raj-pakhurde/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-indigo-400 text-2xl transition-colors duration-200"
            >
              <FaLinkedin />
            </a>
          </motion.div>
        </div>

        {/* Right: Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <div className="w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl shadow-indigo-500/30">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
              <img
                src="/profile.jpg"
                alt="Raj Pakhurde"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <span
                className="text-6xl hidden items-center justify-center w-full h-full"
                aria-hidden="true"
              >
                👨💻
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
