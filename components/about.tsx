"use client";

import { Variants } from "framer-motion";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { RiRobot2Line, RiServerLine, RiEyeLine, RiBrainLine } from "react-icons/ri";

const highlights = [
  {
    icon: <RiRobot2Line size={24} />,
    title: "RAG Pipelines",
    desc: "End-to-end retrieval-augmented generation systems with vector search and semantic chunking.",
  },
  {
    icon: <RiBrainLine size={24} />,
    title: "Multi-Agent Systems",
    desc: "Orchestrating LangGraph workflows with ReAct patterns, tool calling, and agent coordination.",
  },
  {
    icon: <RiServerLine size={24} />,
    title: "Production Deployment",
    desc: "Dockerized, cloud-deployed LLM applications on Render and Azure with CI/CD pipelines.",
  },
  {
    icon: <RiEyeLine size={24} />,
    title: "LLM Observability",
    desc: "OpenTelemetry tracing, evaluation frameworks, and hallucination reduction strategies.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="section-padding relative">
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-700/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-12"
        >
          {/* Section heading */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3 max-w-2xl">
            <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">About Me</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Building AI that ships to{" "}
              <span className="gradient-text">production</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Bio */}
            <motion.div variants={itemVariants} className="flex flex-col gap-5">
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  I&apos;m a self-taught <strong className="text-foreground/90">Generative AI and Agentic AI developer</strong> who transitioned into AI engineering through hands-on project building — not just tutorials, but shipping complete, production-grade systems end-to-end.
                </p>
                <p>
                  My focus is on the full stack of LLM applications: from <strong className="text-foreground/90">RAG pipeline architecture</strong> and vector database integration, to <strong className="text-foreground/90">multi-agent orchestration</strong> with LangGraph, to containerized deployment on cloud infrastructure.
                </p>
                <p>
                  I don&apos;t just prototype — I build systems with real retrieval metrics, observability, and latency budgets. Every project in my portfolio has measurable outcomes.
                </p>
                <p className="pt-2">
                  <strong className="text-brand-300 font-semibold block mb-1">Let's build something together.</strong>
                  I am actively taking on <strong className="text-foreground/90">freelance projects, MVP development for startups, and contract roles</strong>. Whether you need a custom RAG pipeline, an AI chatbot, or a complex multi-agent system, I am ready to deliver a production-ready solution.
                </p>
              </div>

              {/* Tech stack strip */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["LangChain", "LangGraph", "FastAPI", "Pinecone", "Docker", "Azure"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium glass rounded-full text-brand-300 border border-brand-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Highlight cards */}
            <motion.div variants={containerVariants} className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex flex-col gap-3 p-5 glass rounded-2xl border border-white/10 hover:border-brand-500/30 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-gradient text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground/90 mb-1">{item.title}</h3>
                    <p className="text-sm text-foreground/55 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
