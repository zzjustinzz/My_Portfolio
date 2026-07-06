"use client";

import { useRef, useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiInstagramLine,
  RiDownloadLine,
  RiArrowRightLine,
  RiVolumeUpLine,
  RiVolumeMuteLine,
} from "react-icons/ri";
import GridBackground from "./GridBackground";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Attempt to autoplay with sound ON as requested.
    if (videoRef.current) {
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Browser blocked unmuted autoplay. User interaction required to play.", err);
        });
      }
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-700/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-3xl" />
        <GridBackground />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-12 w-full h-full flex flex-col lg:flex-row items-center justify-center gap-14 lg:gap-20">

        {/* ── TEXT CONTENT (left on desktop, top on mobile) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 w-full lg:w-1/2 min-w-0 order-1"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-brand-300 border border-brand-500/20"
          >
            <span>👋</span>
            <span>Generative AI &amp; Agentic AI Engineer</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight"
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">Kishan Kushwaha</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl lg:text-3xl font-semibold gradient-text"
          >
            Generative AI &amp; Agentic AI Engineer
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-foreground/60 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed"
          >
            Building production RAG pipelines and multi-agent systems with LangChain and LangGraph. 
            <strong className="text-foreground/90 font-semibold"> Available for freelance projects, MVP development, and contract roles.</strong> If you have an idea, let's build it.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <motion.a
              id="cta-view-projects"
              href="./project"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-7 py-3.5 bg-brand-gradient text-white font-semibold rounded-xl shadow-brand hover:shadow-brand-lg transition-all duration-300"
            >
              Hire Me / View Projects
              <RiArrowRightLine size={18} />
            </motion.a>
            <motion.a
              id="cta-download-resume"
              href="/Resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-7 py-3.5 glass border border-brand-500/30 text-foreground/80 font-semibold rounded-xl hover:border-brand-500/60 hover:text-brand-300 transition-all duration-300"
            >
              <RiDownloadLine size={18} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <a
              id="social-github"
              href="https://github.com/krishcode11"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-foreground/60 hover:text-brand-300 hover:border-brand-500/30 border border-transparent transition-all duration-200 group"
            >
              <RiGithubFill size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              id="social-linkedin"
              href="https://www.linkedin.com/in/kishan-kushwaha-b71723413/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-foreground/60 hover:text-brand-300 hover:border-brand-500/30 border border-transparent transition-all duration-200 group"
            >
              <RiLinkedinBoxFill size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              id="social-instagram"
              href="https://www.instagram.com/kishan.builds/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-foreground/60 hover:text-brand-300 hover:border-brand-500/30 border border-transparent transition-all duration-200 group"
            >
              <RiInstagramLine size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm">Instagram</span>
            </a>
          </motion.div>
        </motion.div>

        {/* ── VIDEO BLOCK (right on desktop, bottom on mobile) ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.1 }}
          className="w-full lg:w-1/2 flex-shrink-0 order-2"
        >
          {/* Outer glow wrapper */}
          <div className="relative rounded-2xl p-[2px] bg-brand-gradient shadow-brand-lg">
            {/* Video container — 16:9 */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black">
              {/* Fallback — only shown when video fails to load */}
              {videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-brand-gradient">
                  <span className="text-white text-6xl font-extrabold select-none tracking-tight">
                    KK
                  </span>
                </div>
              )}

              <video
                ref={videoRef}
                className="relative z-10 w-full h-full object-cover"
                loop
                muted={muted}
                playsInline
                poster="/hero-poster.png"
                onError={() => setVideoError(true)}
              >
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>

              {/* Mute / unmute toggle */}
              <motion.button
                id="hero-mute-toggle"
                onClick={toggleMute}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className="absolute bottom-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-black/70 transition-all duration-200"
              >
                {muted ? <RiVolumeMuteLine size={18} /> : <RiVolumeUpLine size={18} />}
              </motion.button>
            </div>
          </div>

          {/* Status badge below video */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-4 flex items-center justify-center gap-2 px-4 py-2 glass rounded-full text-sm w-fit mx-auto"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-foreground/70">Open to opportunities</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 bg-gradient-to-b from-brand-500 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}