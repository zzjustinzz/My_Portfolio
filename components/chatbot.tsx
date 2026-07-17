"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiCloseLine, RiLinkedinBoxFill, RiLoader4Line, RiMailLine, RiRobot2Line, RiSendPlaneLine } from "react-icons/ri";

interface Message { role: "user" | "assistant"; content: string; }

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hi, I’m Thanh’s portfolio assistant. Ask about his product work, experience, skills, or how to connect.",
};

const SUGGESTIONS = [
  "Tell me about Thanh",
  "What products has he led?",
  "What are his core skills?",
  "How can I contact Thanh?",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [hintDismissed, setHintDismissed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.sessionStorage.getItem("chat-hint-dismissed") === "1") setHintDismissed(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 180);
    setHintDismissed(true);
    window.sessionStorage.setItem("chat-hint-dismissed", "1");
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const messageText = (text ?? input).trim();
    if (!messageText || loading) return;
    setShowSuggestions(false);
    const userMessage: Message = { role: "user", content: messageText };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await response.json();
      setMessages((current) => [...current, {
        role: "assistant",
        content: data.content || data.error || "I couldn’t load a response. Try the question again.",
      }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "The connection was interrupted. Check your network and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="chat-launcher-wrap">
        <AnimatePresence>
          {!open && !hintDismissed && (
            <motion.div
              className="chat-hint"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.3, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={() => {
                  setHintDismissed(true);
                  window.sessionStorage.setItem("chat-hint-dismissed", "1");
                }}
                aria-label="Dismiss assistant hint"
              ><RiCloseLine aria-hidden="true" /></button>
              <p>Ask Limo about Thanh’s product work.</p>
            </motion.div>
          )}
        </AnimatePresence>
        <button className="chat-launcher" id="chatbot-toggle" type="button" onClick={() => setOpen((current) => !current)} aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"} aria-expanded={open}>
          {open ? <RiCloseLine aria-hidden="true" /> : <RiRobot2Line aria-hidden="true" />}
          {!open && <span className="chat-status" aria-label="Assistant available" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.section
            id="chatbot-window"
            className="chat-window"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Thanh’s portfolio assistant"
          >
            <header className="chat-head">
              <div className="chat-head-main">
                <RiRobot2Line aria-hidden="true" />
                <div><p>Limo · Portfolio assistant</p><p>Answers from Thanh’s portfolio</p></div>
              </div>
              <div className="chat-head-links">
                <a href="https://www.linkedin.com/in/thanh-tr%E1%BA%A7n-5815a0112/" target="_blank" rel="noopener noreferrer" aria-label="Open Thanh’s LinkedIn"><RiLinkedinBoxFill aria-hidden="true" /></a>
                <a href="mailto:thanhtdfu@gmail.com" aria-label="Email Thanh"><RiMailLine aria-hidden="true" /></a>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close portfolio assistant"><RiCloseLine aria-hidden="true" /></button>
              </div>
            </header>

            <div className="chat-messages" aria-live="polite">
              {messages.map((message, index) => (
                <motion.div
                  className={`chat-message ${message.role === "user" ? "is-user" : ""}`}
                  key={`${message.role}-${index}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="chat-bubble">{message.content}</div>
                </motion.div>
              ))}
              {loading && (
                <div className="chat-message">
                  <div className="chat-bubble"><RiLoader4Line className="animate-spin" aria-label="Loading response" /></div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {showSuggestions && (
              <div className="chat-suggestions">
                <p className="meta">Suggested questions</p>
                <div className="chat-suggestion-list">
                  {SUGGESTIONS.map((suggestion) => (
                    <button className="chat-suggestion" key={suggestion} type="button" onClick={() => sendMessage(suggestion)}>{suggestion}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="chat-compose">
              <input
                ref={inputRef}
                className="chat-input"
                id="chatbot-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); }
                }}
                placeholder="Ask about Thanh’s work…"
                aria-label="Question for portfolio assistant"
              />
              <button className="chat-send" id="chatbot-send" type="button" onClick={() => sendMessage()} disabled={!input.trim() || loading} aria-label="Send question" aria-busy={loading}>
                {loading ? <RiLoader4Line className="animate-spin" aria-hidden="true" /> : <RiSendPlaneLine aria-hidden="true" />}
              </button>
            </div>

            <footer className="chat-foot"><span>Connect with Thanh</span><span>LinkedIn · Email</span></footer>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
