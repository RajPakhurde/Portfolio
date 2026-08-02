import { useState } from "react";
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-bg-deep/75 backdrop-blur-xl border-b border-border-default transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        
        {/* Logo */}
        <a 
          href="#home" 
          className="text-foreground font-semibold text-lg tracking-tight hover:text-accent transition-colors duration-200 flex items-center gap-1.5 font-sans"
        >
          <span className="text-accent font-bold">&lt;</span>
          <span className="font-serif">Raj Pakhurde</span>
          <span className="text-accent font-bold">/&gt;</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-foreground-muted hover:text-foreground text-sm font-medium transition-colors duration-200 relative group py-2"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: theme toggle + icons + resume */}
        <div className="hidden md:flex items-center gap-5">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border-default hover:bg-surface-hover text-foreground-muted hover:text-foreground transition-all duration-200 cursor-pointer shadow-inner-highlight"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
          </button>

          <a 
            href="https://github.com/rajpakhurde" 
            target="_blank" 
            rel="noreferrer"
            className="text-foreground-muted hover:text-foreground transition-colors duration-200 text-lg"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a 
            href="https://www.linkedin.com/in/raj-pakhurde/" 
            target="_blank" 
            rel="noreferrer"
            className="text-foreground-muted hover:text-foreground transition-colors duration-200 text-lg"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="/Raj_Pakhurde_Resume.pdf"
            download
            className="px-4 py-1.5 text-xs font-semibold rounded-lg border border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/60 transition-all duration-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] bg-white/[0.02]"
          >
            Resume
          </a>
        </div>

        {/* Mobile Hamburger / Controls */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border-default hover:bg-surface-hover text-foreground-muted hover:text-foreground transition-all duration-200 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
          </button>

          <button
            className="text-foreground-muted hover:text-foreground text-xl transition-colors duration-200 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-bg-base border-b border-border-default px-4 pb-6 overflow-hidden backdrop-blur-xl"
          >
            <ul className="flex flex-col gap-4 pt-4">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-foreground-muted hover:text-foreground text-sm font-medium transition-colors py-1"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-border-default">
              <div className="flex items-center gap-6">
                <a 
                  href="https://github.com/rajpakhurde" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-foreground-muted hover:text-foreground text-xl transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a 
                  href="https://www.linkedin.com/in/raj-pakhurde/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-foreground-muted hover:text-foreground text-xl transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
              <a
                href="/Raj_Pakhurde_Resume.pdf"
                download
                className="w-full text-center px-4 py-2 text-sm font-medium rounded-lg border border-accent/40 text-accent hover:bg-accent/10 transition-all duration-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] bg-white/[0.02]"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
