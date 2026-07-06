"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiRobot2Line,
  RiCloseLine,
  RiSendPlaneLine,
  RiLoader4Line,
  RiSparklingLine,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiInstagramLine,
} from "react-icons/ri";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hey there! 👋 I'm Limo, Kishan's AI assistant. Whether you're a recruiter, collaborator, or just curious — I'm here to help. What would you like to know?",
};

const SUGGESTIONS = [
  "Tell me about yourself",
  "What projects have you built?",
  "Are you open to collaboration?",
  "What are your core skills?",
  "How can I contact Kishan?",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setTooltipDismissed(true); // dismiss tooltip permanently once opened
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const playClickSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Silently ignore if audio context is blocked
    }
  };

  const toggleChatbot = () => {
    playClickSound();
    setOpen((v) => !v);
  };

  const sendMessage = async (text?: string) => {
    const messageText = (text ?? input).trim();
    if (!messageText || loading) return;

    // Hide suggestions once user starts chatting
    setShowSuggestions(false);

    const userMsg: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.content || data.error || "Sorry, something went wrong.",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <>
      {/* Floating button container with tooltip */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
        {/* Cloud Tooltip Message */}
        <AnimatePresence>
          {!open && !tooltipDismissed && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 20 }}
              className="relative mb-2 px-4 py-3 bg-brand-900/90 backdrop-blur-md border border-brand-500/30 rounded-2xl shadow-brand-lg text-sm text-white/90 max-w-[240px]"
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setTooltipDismissed(true); }}
                className="absolute top-1 right-1.5 p-1 text-white/40 hover:text-white transition-colors"
                aria-label="Dismiss message"
              >
                <RiCloseLine size={14} />
              </button>
              <p className="mt-1 leading-snug font-medium pr-2 text-[13px]">
                Hi! I&apos;m <strong className="text-brand-300">Limo</strong>, Kishan&apos;s Assistant. Chat with me to learn more about him!
              </p>
              {/* Speech bubble pointer */}
              <div className="absolute top-1/2 -right-[5px] -translate-y-1/2 w-3 h-3 bg-brand-900/90 border-r border-t border-brand-500/30 transform rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating button */}
        <motion.button
          id="chatbot-toggle"
          onClick={toggleChatbot}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-brand-gradient text-white shadow-brand-lg flex items-center justify-center flex-shrink-0"
          aria-label="Open AI assistant"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <RiCloseLine size={22} />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <RiRobot2Line size={22} />
              </motion.div>
            )}
          </AnimatePresence>
          {!open && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[var(--background)] animate-pulse" />
          )}
        </motion.button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[390px] flex flex-col glass rounded-2xl border border-white/15 shadow-brand-lg overflow-hidden"
            style={{ maxHeight: "calc(100vh - 120px)", height: "560px" }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-4 py-3 bg-brand-gradient border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/20">
                  <RiSparklingLine size={18} className="text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">Kishan&apos;s AI Assistant</p>
                  <p className="text-xs text-white/60">Ask me anything · Always online</p>
                </div>
              </div>

              {/* Connect links */}
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/krishcode11"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="chatbot-github-link"
                  title="Kishan's GitHub"
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/15 hover:bg-white/30 text-white transition-all duration-200"
                >
                  <RiGithubFill size={17} />
                </a>
                <a
                  href="https://www.linkedin.com/in/kishan-kushwaha-b71723413/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="chatbot-linkedin-link"
                  title="Kishan's LinkedIn"
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/15 hover:bg-white/30 text-white transition-all duration-200"
                >
                  <RiLinkedinBoxFill size={17} />
                </a>
                <a
                  href="https://www.instagram.com/kishan.builds/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="chatbot-instagram-link"
                  title="Kishan's Instagram"
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/15 hover:bg-white/30 text-white transition-all duration-200"
                >
                  <RiInstagramLine size={17} />
                </a>
              </div>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  {msg.role === "assistant" && (
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/30 flex items-center justify-center mr-2 mt-1">
                      <RiSparklingLine size={12} className="text-brand-300" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                      msg.role === "user"
                        ? "bg-brand-gradient text-white rounded-tr-sm"
                        : "glass border border-white/10 text-foreground/85 rounded-tl-sm"
                    )}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/30 flex items-center justify-center mr-2 mt-1">
                    <RiSparklingLine size={12} className="text-brand-300" />
                  </div>
                  <div className="glass border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 bg-brand-400 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Suggestion chips ── */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-4 pb-3 flex-shrink-0 border-t border-white/5"
                >
                  <p className="text-[10px] text-foreground/35 uppercase tracking-widest pt-3 pb-2 font-medium">
                    Quick questions
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map((s) => (
                      <motion.button
                        key={s}
                        id={`chatbot-suggestion-${s.replace(/\s+/g, "-").toLowerCase()}`}
                        onClick={() => handleSuggestion(s)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-2.5 py-1.5 text-xs rounded-lg border border-brand-500/30 bg-brand-500/10 text-brand-300 hover:bg-brand-500/25 hover:border-brand-400/50 hover:text-brand-200 transition-all duration-150 cursor-pointer"
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input ── */}
            <div className="px-4 py-3 border-t border-white/10 flex items-center gap-2 flex-shrink-0 bg-white/2">
              <input
                ref={inputRef}
                id="chatbot-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Kishan's work…"
                disabled={loading}
                className="flex-1 px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground/90 placeholder-foreground/30 focus:outline-none focus:border-brand-500/50 transition-all disabled:opacity-50"
              />
              <motion.button
                id="chatbot-send"
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-gradient text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              >
                {loading ? <RiLoader4Line size={16} className="animate-spin" /> : <RiSendPlaneLine size={16} />}
              </motion.button>
            </div>

            {/* ── Connect footer ── */}
            <div className="px-4 py-2.5 border-t border-white/8 flex items-center justify-between flex-shrink-0 bg-white/[0.02]">
              <span className="text-[10px] text-foreground/30">Connect with Kishan</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/krishcode11"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="chatbot-footer-github"
                  className="flex items-center gap-1 text-[11px] text-foreground/40 hover:text-brand-300 transition-colors duration-150"
                >
                  <RiGithubFill size={13} />
                  <span>GitHub</span>
                </a>
                <span className="text-foreground/20">·</span>
                <a
                  href="https://linkedin.com/in/kishan-kushwaha"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="chatbot-footer-linkedin"
                  className="flex items-center gap-1 text-[11px] text-foreground/40 hover:text-brand-300 transition-colors duration-150"
                >
                  <RiLinkedinBoxFill size={13} />
                  <span>LinkedIn</span>
                </a>
                <span className="text-foreground/20">·</span>
                <a
                  href="https://www.instagram.com/kishan.builds/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="chatbot-footer-instagram"
                  className="flex items-center gap-1 text-[11px] text-foreground/40 hover:text-brand-300 transition-colors duration-150"
                >
                  <RiInstagramLine size={13} />
                  <span>Insta</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
