import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
// import Architecture from "../components/Architecture";
import GitHubStats from "../components/GithubStats";
import Contact from "../components/Contact";
// import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen scroll-smooth">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <Hero />
        <About />
        <Skills />
        <Projects />
        {/* <Architecture /> */}
        <GitHubStats />
        <Contact />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
