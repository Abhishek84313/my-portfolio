import Background from "./components/Background";
import Cursor from "./components/Cursor";
import Splash from "./components/Splash";
import ScrollProgress from "./components/ScrollProgress";
import CommandPalette from "./components/CommandPalette";
import BackToTop from "./components/BackToTop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Profiles from "./components/Profiles";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Splash />
      <Background />
      <Cursor />
      <ScrollProgress />
      <CommandPalette />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Profiles />
        <Contact />
      </main>
      <BackToTop />
      <Footer />
    </>
  );
}
