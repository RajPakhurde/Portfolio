import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const highlights = [
  {
    icon: <FaCode className="text-indigo-400 text-2xl" />,
    title: "Full Stack Development",
    desc: "Building end-to-end web applications with React and Spring Boot.",
  },
  {
    icon: <FaServer className="text-purple-400 text-2xl" />,
    title: "Backend Development",
    desc: "Designing robust REST APIs and microservices with Java & Spring Boot.",
  },
  {
    icon: <FaDatabase className="text-pink-400 text-2xl" />,
    title: "Database Optimization",
    desc: "Writing efficient SQL queries and optimizing relational database schemas.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-gray-900 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            About{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">

          {/* Left: Text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
            className="flex-1 space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed text-center md:text-left"
          >
            <p>
              I'm <span className="text-white font-semibold">Raj Pakhurde</span>, a passionate Full Stack Developer
              with strong experience in Java, Spring Boot, React, and SQL. I recently completed the{" "}
              <span className="text-indigo-400 font-medium">PG-DAC program</span> from Sunbeam Institute of
              Information Technology and enjoy building scalable applications and solving real-world problems.
            </p>
            <p>
              I have built projects like{" "}
              <span className="text-white font-medium">AcademiaSuite</span>, a desktop application for exam cell
              management, and an{" "}
              <span className="text-white font-medium">E-Car Reselling Platform</span> that allows users to buy and
              sell used vehicles with role-based authentication.
            </p>
            <p>
              I enjoy learning new technologies, optimizing system performance, and designing clean and scalable
              software architectures.
            </p>
          </motion.div>

          {/* Right: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="w-52 h-52 sm:w-60 sm:h-60 lg:w-68 lg:h-68 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl shadow-indigo-500/20">
              <div className="w-full h-full rounded-2xl bg-gray-800 flex items-center justify-center overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Raj Pakhurde"
                  className="w-full h-full object-cover rounded-2xl"
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

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {highlights.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1 * (i + 1)}
              className="bg-gray-800/60 border border-gray-700 rounded-xl p-6 flex flex-col gap-3 hover:border-indigo-500/50 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-700/60 flex items-center justify-center">
                {icon}
              </div>
              <h3 className="text-white font-semibold text-sm">{title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
