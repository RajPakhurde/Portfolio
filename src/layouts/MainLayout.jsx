import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import GitHubStats from "../components/GithubStats";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import GlassmorphicBackground from "../components/GlassmorphicBackground";

export default function MainLayout() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="relative min-h-screen bg-bg-deep text-foreground selection:bg-accent/30 selection:text-foreground overflow-x-hidden font-sans transition-colors duration-300">
      
      {/* BACKGROUND SYSTEM */}
      
      {/* Layer 1: Base Gradient (Fades out in light mode, matches near-black in dark mode) */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,#0a0a14_0%,#050506_50%,#020203_100%)] opacity-0 dark:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Layer 2: Floating Glassmorphic Orbs (Fills the background dynamically) */}
      <GlassmorphicBackground />
      
      {/* Layer 3: Noise Texture */}
      <div className="fixed inset-0 z-0 bg-noise-overlay opacity-0 dark:opacity-[0.015] transition-opacity duration-500 pointer-events-none" />


      {/* CONTENT SYSTEM */}
      <div className="relative z-10">
        <CustomCursor />
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <Hero />
          <Projects />
          <Experience />
          <Skills />
          <GitHubStats theme={theme} />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
