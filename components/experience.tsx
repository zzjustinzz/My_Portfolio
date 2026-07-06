"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experienceData } from "@/lib/data";
import { RiCodeSSlashLine, RiGraduationCapLine } from "react-icons/ri";

const icons = [<RiCodeSSlashLine key="code" size={20} />, <RiGraduationCapLine key="edu" size={20} />];

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="section-padding relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-700/8 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-12"
        >
          {/* Section heading */}
          <div className="flex flex-col gap-3">
            <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">Journey</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Experience &amp;{" "}
              <span className="gradient-text">Education</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500 via-brand-700/40 to-transparent hidden sm:block" />

            <div className="flex flex-col gap-10">
              {experienceData.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative sm:pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-brand-gradient text-white shadow-brand flex-shrink-0">
                    {icons[index] || icons[0]}
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="glass rounded-2xl border border-white/10 hover:border-brand-500/30 p-6 transition-all duration-300"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-foreground/90">{item.title}</h3>
                        <p className="text-sm text-brand-400 font-medium">{item.subtitle}</p>
                      </div>
                      <span className="px-3 py-1 text-xs font-semibold glass rounded-full text-brand-300 border border-brand-500/25 flex-shrink-0">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-sm text-foreground/60 leading-relaxed mb-4">{item.description}</p>

                    {item.highlights && (
                      <ul className="flex flex-col gap-1.5">
                        {item.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2 text-sm text-foreground/55">
                            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
