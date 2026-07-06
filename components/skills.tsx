"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skillsData } from "@/lib/data";

const categoryColors: Record<string, string> = {
  "Languages": "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300",
  "LLMs & Generative AI": "from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-300",
  "Agentic AI": "from-brand-500/20 to-brand-700/20 border-brand-500/30 text-brand-300",
  "RAG & Search": "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300",
  "Frameworks": "from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-300",
  "Databases": "from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-300",
  "Infra & Tools": "from-slate-500/20 to-gray-500/20 border-slate-500/30 text-slate-300",
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-600/8 rounded-full blur-3xl -z-10" />

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
            <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">Technical Skills</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              The tools I build with —{" "}
              <span className="gradient-text">no fluff</span>
            </h2>
            <p className="text-foreground/55 text-base">
              Every skill listed here is backed by a shipped project. No resume-padding.
            </p>
          </motion.div>

          {/* Skill groups */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillsData.map((group) => {
              const colorClass = categoryColors[group.category] || "from-brand-500/20 to-brand-700/20 border-brand-500/30 text-brand-300";
              return (
                <motion.div
                  key={group.category}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.015 }}
                  className="group relative p-5 glass rounded-2xl border border-white/10 hover:border-brand-400/60 hover:shadow-brand-lg transition-all duration-400 overflow-hidden z-10"
                >
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover glow inside card */}
                  <div className="absolute inset-0 bg-brand-gradient-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-400 -z-10" />

                  <h3 className="relative text-sm font-semibold text-foreground/50 group-hover:text-brand-300 uppercase tracking-widest mb-4 transition-colors duration-200">
                    {group.category}
                  </h3>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="flex flex-wrap gap-2"
                  >
                    {group.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={badgeVariants}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r border ${colorClass} backdrop-blur-sm cursor-default transition-all duration-200`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
