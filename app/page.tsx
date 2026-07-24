import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import OffTheClock from "@/components/off-the-clock";
import Contact from "@/components/contact";
import Chatbot from "@/components/chatbot";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <OffTheClock />
      <Contact />
      <Chatbot />
    </>
  );
}
