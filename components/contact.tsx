"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { RiLinkedinBoxFill, RiLoader4Line, RiMailLine, RiPhoneLine, RiSendPlaneLine } from "react-icons/ri";
import { sendEmail } from "@/actions/sendEmail";

type Field = "name" | "email" | "message";

export default function Contact() {
  const [form, setForm] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState<Record<Field, boolean>>({ name: false, email: false, message: false });
  const [loading, setLoading] = useState(false);

  const getError = (field: Field) => {
    if (field === "name" && !form.name.trim()) return "Add your name so Thanh knows who is writing.";
    if (field === "email" && !form.email.trim()) return "Add an email address so Thanh can reply.";
    if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "This email format is incomplete. Use name@example.com.";
    if (field === "message" && form.message.trim().length < 10) return "Add at least 10 characters so the request has enough context.";
    return "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if ((Object.keys(form) as Field[]).some((field) => getError(field))) return;
    setLoading(true);
    try {
      const result = await sendEmail(form);
      if (result.success) {
        toast.success("Message sent. Thanh will reply by email.");
        setForm({ name: "", email: "", message: "" });
        setTouched({ name: false, email: false, message: false });
      } else {
        toast.error(result.error || "The message was not sent. Check your connection and try again.");
      }
    } catch {
      toast.error("The message was not sent. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldProps = (field: Field) => {
    const error = touched[field] ? getError(field) : "";
    return {
      value: form[field],
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((current) => ({ ...current, [field]: event.target.value })),
      onBlur: () => setTouched((current) => ({ ...current, [field]: true })),
      "aria-invalid": Boolean(error),
      "aria-describedby": `${field}-help`,
      "aria-required": true,
    };
  };

  return (
    <section id="contact" className="section section--roomy contact-section">
      <div className="contact-layout page-shell">
        <div className="contact-copy">
          <div className="accent-line" aria-hidden="true" />
          <h2 className="section-title">Bring the hard product problem.</h2>
          <p className="section-lede">Interested in product leadership, digital transformation, or smart city collaboration? Share the context and Thanh will respond directly.</p>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="contact-name">Your name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Trần Minh Anh" {...fieldProps("name")} />
              <p id="name-help" className={`field-help ${touched.name && getError("name") ? "is-error" : ""}`}>{touched.name ? getError("name") : "Who should Thanh address in the reply?"}</p>
            </div>
            <div className="field">
              <label htmlFor="contact-email">Email address</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="name@company.com" {...fieldProps("email")} />
              <p id="email-help" className={`field-help ${touched.email && getError("email") ? "is-error" : ""}`}>{touched.email ? getError("email") : "Used only to reply to this message."}</p>
            </div>
            <div className="field">
              <label htmlFor="contact-message">Project context</label>
              <textarea id="contact-message" name="message" rows={5} placeholder="What are you building, and where is it stuck?" {...fieldProps("message")} />
              <p id="message-help" className={`field-help ${touched.message && getError("message") ? "is-error" : ""}`}>{touched.message ? getError("message") : "A short description is enough to start."}</p>
            </div>
            <button className="btn btn--primary" id="contact-submit" type="submit" disabled={loading} aria-busy={loading}>
              {loading ? <><RiLoader4Line className="animate-spin" aria-hidden="true" /> Sending…</> : <><RiSendPlaneLine aria-hidden="true" /> Send message</>}
            </button>
          </form>
        </div>

        <aside className="contact-aside">
          <div><p className="meta">Direct channels</p><h3 className="contact-aside-title">Ho Chi Minh City, Vietnam.</h3></div>
          <div className="contact-list">
            <a className="contact-link" id="contact-mailto" href="mailto:thanhtdfu@gmail.com"><RiMailLine aria-hidden="true" /><span>thanhtdfu@gmail.com</span></a>
            <a className="contact-link" id="contact-phone" href="tel:+84933848491"><RiPhoneLine aria-hidden="true" /><span>+84 933 848 491</span></a>
            <a className="contact-link" id="contact-linkedin" href="https://www.linkedin.com/in/thanh-tr%E1%BA%A7n-5815a0112/" target="_blank" rel="noopener noreferrer"><RiLinkedinBoxFill aria-hidden="true" /><span>LinkedIn profile</span></a>
          </div>
          <p className="section-lede">Open to conversations about product management, digital platforms, and cross-functional delivery.</p>
        </aside>
      </div>
    </section>
  );
}
