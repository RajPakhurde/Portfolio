import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaCode, FaServer, FaDatabase } from "react-icons/fa";
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

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.012, // 12ms per character for readable flow
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.02 },
  },
};

const highlights = [
  {
    icon: <FaCode className="text-accent text-xl" />,
    title: "Full Stack Development",
    desc: "Building end-to-end web applications with React and Spring Boot.",
  },
  {
    icon: <FaServer className="text-indigo-400 dark:text-indigo-400 text-xl" />,
    title: "Backend Development",
    desc: "Designing robust REST APIs and microservices with Java & Spring Boot.",
  },
  {
    icon: <FaDatabase className="text-purple-400 dark:text-purple-400 text-xl" />,
    title: "Database Optimization",
    desc: "Writing efficient SQL queries and optimizing relational database schemas.",
  },
];

const bioParagraphs = [
  [
    { text: "I'm " },
    { text: "Raj Pakhurde", bold: true },
    { text: ", a passionate Full Stack Developer with strong experience in Java, Spring Boot, React, and SQL. I recently completed the " },
    { text: "PG-DAC program", accent: true },
    { text: " from Sunbeam Institute of Information Technology and enjoy building scalable applications and solving real-world problems." }
  ],
  [
    { text: "I have built projects like " },
    { text: "ExamSync", bold: true },
    { text: ", a desktop application for exam cell automation, and " },
    { text: "AutoSphere", bold: true },
    { text: ", a full-stack vehicle resale platform with role-based authentication." }
  ],
  [
    { text: "I enjoy learning new technologies, optimizing system performance, and designing clean and scalable software architectures." }
  ]
];

function TypewriterText({ chunks, animate, onComplete }) {
  return (
    <motion.p
      variants={sentenceVariants}
      initial="hidden"
      animate={animate ? "visible" : "hidden"}
      onAnimationComplete={() => {
        if (animate && onComplete) {
          onComplete();
        }
      }}
      className="text-foreground-muted text-sm sm:text-base leading-relaxed text-center md:text-left min-h-[3em]"
    >
      {chunks.map((chunk, chunkIdx) => {
        let spanClass = "";
        if (chunk.bold) spanClass = "text-foreground font-semibold";
        if (chunk.accent) spanClass = "text-accent font-medium font-sans";
        
        return (
          <span key={chunkIdx} className={spanClass}>
            {chunk.text.split(" ").map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    variants={letterVariants}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </span>
        );
      })}
    </motion.p>
  );
}

export default function About() {
  const [activeParagraph, setActiveParagraph] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && activeParagraph === 0) {
      setActiveParagraph(1);
    }
  }, [isInView, activeParagraph]);

  return (
    <section id="about" className="py-32 relative z-10 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
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
              About
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif font-semibold tracking-tight bg-gradient-to-b from-foreground via-foreground/95 to-foreground/70 bg-clip-text text-transparent">
            About{" "}
            <span className="bg-gradient-to-r from-accent via-accent-bright to-accent bg-clip-text text-transparent animate-shimmer">
              Me
            </span>
          </h2>
          <div className="mt-4 mx-auto w-12 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row items-center gap-16 mb-20">

          {/* Left: Text (Sequential Typewriter reveal) */}
          <div ref={containerRef} className="flex-1 space-y-5">
            <TypewriterText 
              chunks={bioParagraphs[0]} 
              animate={activeParagraph >= 1} 
              onComplete={() => setActiveParagraph(2)} 
            />
            <TypewriterText 
              chunks={bioParagraphs[1]} 
              animate={activeParagraph >= 2} 
              onComplete={() => setActiveParagraph(3)} 
            />
            <TypewriterText 
              chunks={bioParagraphs[2]} 
              animate={activeParagraph >= 3} 
            />
          </div>

          {/* Right: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 relative"
          >
            <div className="absolute inset-0 rounded-2xl bg-accent/10 blur-[30px] pointer-events-none transform translate-y-2 scale-95" />
            
            <div className="w-52 h-52 sm:w-60 sm:h-60 lg:w-68 lg:h-68 rounded-2xl p-[1px] bg-gradient-to-b from-white/10 to-white/[0.02] border border-border-default shadow-card-default overflow-hidden">
              <div className="w-full h-full rounded-2xl bg-bg-elevated flex items-center justify-center overflow-hidden">
                <img
                  src="/profile_anime.jpg"
                  alt="Raj Pakhurde"
                  className="w-full h-full object-cover rounded-2xl filter grayscale hover:grayscale-0 transition-all duration-500 ease-out"
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
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {highlights.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={0.08 * (i + 1)}
            >
              <SpotlightCard className="p-6 h-full flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface border border-border-default flex items-center justify-center shadow-inner-highlight">
                  {icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-foreground font-semibold text-sm tracking-tight">{title}</h3>
                  <p className="text-foreground-muted text-xs leading-relaxed">{desc}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
