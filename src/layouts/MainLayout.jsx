import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import GitHubStats from "../components/GithubStats";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

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
      
      {/* Layer 2: Grid Overlay */}
      <div className="fixed inset-0 z-0 bg-grid-overlay opacity-100 pointer-events-none" />
      
      {/* Layer 3: Noise Texture */}
      <div className="fixed inset-0 z-0 bg-noise-overlay opacity-0 dark:opacity-[0.015] transition-opacity duration-500 pointer-events-none" />
      
      {/* Layer 4: Animated Gradient Blobs (Only active in dark mode) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-0 dark:opacity-100 transition-opacity duration-500">
        {/* Primary Blob */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[750px] rounded-full bg-accent/15 blur-[140px] animate-float-slow" />
        
        {/* Secondary Blob */}
        <div className="absolute top-[25%] -left-[200px] w-[600px] h-[800px] rounded-full bg-purple-900/10 blur-[120px] animate-float-medium" />
        
        {/* Tertiary Blob */}
        <div className="absolute top-[50%] -right-[200px] w-[500px] h-[700px] rounded-full bg-indigo-900/8 blur-[100px] animate-float-slow" />
        
        {/* Center Glow Blob (Soft gradient circle in the middle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-accent-bright/6 blur-[130px] animate-pulse-slow pointer-events-none" />

        {/* Bottom Accent */}
        <div className="absolute bottom-[-100px] left-[20%] w-[900px] h-[600px] rounded-full bg-accent/8 blur-[130px] animate-pulse-slow" />
      </div>

      {/* CONTENT SYSTEM */}
      <div className="relative z-10">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <GitHubStats theme={theme} />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
