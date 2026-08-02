import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CONTACT_INFO } from "../utils/constants";

export default function Footer() {
  return (
    <footer className="relative border-t border-border-default bg-bg-deep/80 backdrop-blur-md py-12 mt-20 z-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright / Info */}
        <div className="text-center md:text-left">
          <p className="text-sm text-foreground-muted font-medium">
            © {new Date().getFullYear()} Raj Pakhurde. All rights reserved.
          </p>
          <p className="text-xs text-foreground-subtle mt-1 font-mono">
            Built with precision, motion, and ambient light.
          </p>
        </div>

        {/* System Status / Meta */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-foreground-subtle font-mono uppercase tracking-wider">
            System status: nominal
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href={CONTACT_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="text-foreground-muted hover:text-foreground transition-colors duration-200 text-lg"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={CONTACT_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-foreground-muted hover:text-accent transition-colors duration-200 text-lg"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>

      </div>
    </footer>
  );
}
