import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 100]);
  const opacity = useTransform(scrollY, [0, 250], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.97]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      <motion.div 
        style={{ y, opacity, scale }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 flex flex-col-reverse md:flex-row items-center gap-16 relative z-10"
      >
        {/* Left: Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-accent font-mono text-xs uppercase tracking-widest font-semibold"
          >
            Hi, I'm Raj Pakhurde
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-4xl sm:text-5xl lg:text-7xl font-serif font-semibold tracking-tight leading-none text-foreground"
          >
            Full Stack{" "}
            <span className="block mt-2 bg-gradient-to-r from-accent via-accent-bright to-accent bg-clip-text text-transparent animate-shimmer">
              Developer
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="text-foreground-muted text-sm sm:text-base font-mono tracking-wide flex flex-wrap gap-2 justify-center md:justify-start items-center"
          >
            <span>Java</span>
            <span className="text-foreground-subtle/20">•</span>
            <span>Spring Boot</span>
            <span className="text-foreground-subtle/20">•</span>
            <span>React</span>
            <span className="text-foreground-subtle/20">•</span>
            <span>C# .NET</span>
            <span className="text-foreground-subtle/20">•</span>
            <span>Node.js</span>
            <span className="text-foreground-subtle/20">•</span>
            <span>SQL</span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-foreground-muted text-sm sm:text-base max-w-xl mx-auto md:mx-0 leading-relaxed font-sans"
          >
            I build scalable full-stack applications and enjoy solving
            real-world problems using modern technologies.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <motion.a
              href="#projects"
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-accent-bright text-white font-semibold text-sm transition-all duration-300 shadow-button-primary hover:shadow-button-primary-hover flex items-center gap-2 cursor-pointer"
            >
              <span className="relative z-10">View Projects</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </motion.a>

            <motion.a
              href="#contact"
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden px-6 py-3 rounded-lg bg-bg-elevated text-foreground border border-border-default hover:bg-surface-hover hover:border-border-hover font-semibold text-sm transition-all duration-300 shadow-inner-highlight hover:shadow-card-hover flex items-center gap-2 cursor-pointer"
            >
              <span className="relative z-10">Contact Me</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-foreground/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="pt-2 flex gap-5 justify-center md:justify-start"
          >
            <a
              href="https://github.com/rajpakhurde"
              target="_blank"
              rel="noreferrer"
              className="text-foreground-subtle hover:text-foreground text-xl transition-colors duration-200"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/raj-pakhurde/"
              target="_blank"
              rel="noreferrer"
              className="text-foreground-subtle hover:text-accent text-xl transition-colors duration-200"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
          </motion.div>
        </div>

        {/* Right: Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 relative"
        >
          {/* Subtle accent glow behind the profile image */}
          <div className="absolute inset-0 rounded-full bg-accent/20 blur-[50px] pointer-events-none transform -translate-y-4 scale-95 animate-pulse-slow" />
          
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full p-[1px] bg-gradient-to-b from-white/10 to-white/[0.02] border border-border-default shadow-card-default overflow-hidden">
            <div className="w-full h-full rounded-full bg-bg-elevated flex items-center justify-center overflow-hidden">
              <img
                src="/profile_anime.jpg"
                alt="Raj Pakhurde"
                className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-500 ease-out"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <span
                className="text-6xl hidden items-center justify-center w-full h-full"
                aria-hidden="true"
              >
                👨‍💻
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
