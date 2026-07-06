"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import toast from "react-hot-toast";
import { sendEmail } from "@/actions/sendEmail";
import { RiMailLine, RiGithubFill, RiLinkedinBoxFill, RiSendPlaneLine, RiLoader4Line } from "react-icons/ri";

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.message.trim() || form.message.length < 10) e.message = "Message must be at least 10 characters.";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const result = await sendEmail(form);
      if (result.success) {
        toast.success("Message sent! I'll get back to you soon. 🚀");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(result.error || "Something went wrong.");
      }
    } catch {
      toast.error("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-brand-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-12"
        >
          {/* Heading */}
          <div className="text-center flex flex-col items-center gap-3">
            <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">Contact</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Let&apos;s build something{" "}
              <span className="gradient-text">together</span>
            </h2>
            <p className="text-foreground/55 text-base max-w-lg">
              Open to freelance, full-time roles, and interesting AI collaborations. Drop me a message.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="glass rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col gap-5"
              noValidate
            >
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-sm font-medium text-foreground/70">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground/90 placeholder-foreground/30 focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30 transition-all duration-200"
                />
                {errors.name && <span className="text-xs text-rose-400">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-sm font-medium text-foreground/70">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground/90 placeholder-foreground/30 focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30 transition-all duration-200"
                />
                {errors.email && <span className="text-xs text-rose-400">{errors.email}</span>}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-sm font-medium text-foreground/70">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me what you're working on..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground/90 placeholder-foreground/30 focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30 transition-all duration-200 resize-none"
                />
                {errors.message && <span className="text-xs text-rose-400">{errors.message}</span>}
              </div>

              <motion.button
                id="contact-submit"
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-gradient text-white font-semibold rounded-xl shadow-brand hover:shadow-brand-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><RiLoader4Line size={18} className="animate-spin" /> Sending…</>
                ) : (
                  <><RiSendPlaneLine size={18} /> Send Message</>
                )}
              </motion.button>
            </motion.form>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col gap-6"
            >
              <div className="glass rounded-2xl border border-white/10 p-6 flex flex-col gap-5">
                <h3 className="font-semibold text-foreground/80">Or reach me directly</h3>

                <a
                  href="mailto:aiautomationforme@gmail.com"
                  id="contact-mailto"
                  className="flex items-center gap-3 text-foreground/60 hover:text-brand-300 transition-colors duration-200 group"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20 transition-colors">
                    <RiMailLine size={20} />
                  </span>
                  <span className="text-sm">aiautomationforme</span>
                </a>

                <div className="flex flex-col gap-3">
                  <a
                    href="https://github.com/krishcode11"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-github"
                    className="flex items-center gap-3 text-foreground/60 hover:text-brand-300 transition-colors duration-200 group"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20 transition-colors">
                      <RiGithubFill size={20} />
                    </span>
                    <span className="text-sm">github.com/krishcode11</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kishan-kushwaha-b71723413/"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-linkedin"
                    className="flex items-center gap-3 text-foreground/60 hover:text-brand-300 transition-colors duration-200 group"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20 transition-colors">
                      <RiLinkedinBoxFill size={20} />
                    </span>
                    <span className="text-sm">linkedin.com/in/kishan-kushwaha</span>
                  </a>
                </div>
              </div>

              <div className="glass rounded-2xl border border-brand-500/20 p-5 bg-brand-gradient-subtle">
                <p className="text-sm text-foreground/60 leading-relaxed">
                  💡 <strong className="text-foreground/80">Availability:</strong> Open to Gen AI / Agentic AI roles, RAG consulting, and interesting LLM projects. Response within 24 hours.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
