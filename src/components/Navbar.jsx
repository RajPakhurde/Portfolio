import { useState } from "react";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <a href="#home" className="text-white font-bold text-xl tracking-tight hover:text-indigo-400 transition-colors">
          Raj Pakhurde
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-gray-400 hover:text-indigo-400 text-sm font-medium transition-colors duration-200 relative group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: icons + resume */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://github.com/rajpakhurde" target="_blank" rel="noreferrer"
            className="text-gray-400 hover:text-white transition-colors text-xl">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/raj-pakhurde/" target="_blank" rel="noreferrer"
            className="text-gray-400 hover:text-white transition-colors text-xl">
            <FaLinkedin />
          </a>
          <a
            href="/Raj_Pakhurde_Resume.pdf"
            download
            className="px-4 py-1.5 text-sm font-medium rounded-md border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-200"
          >
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-white text-2xl transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 pb-4">
          <ul className="flex flex-col gap-3 pt-3">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-300 hover:text-indigo-400 text-sm font-medium transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 mt-4">
            <a href="https://github.com/rajpakhurde" target="_blank" rel="noreferrer"
              className="text-gray-400 hover:text-white text-xl transition-colors">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/raj-pakhurde/" target="_blank" rel="noreferrer"
              className="text-gray-400 hover:text-white text-xl transition-colors">
              <FaLinkedin />
            </a>
            <a
              href="/Raj_Pakhurde_Resume.pdf"
              download
              className="px-4 py-1.5 text-sm font-medium rounded-md border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-200"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
