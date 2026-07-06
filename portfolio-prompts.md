# AI Engineer Portfolio — Step-by-Step Build Prompts (for Antigravity)

**Assumption:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.
Ye stack modern, fast, aur recruiters/tech reviewers ke liye credible dikhta hai.
Agar tumhe koi aur stack chahiye, bol dena — prompts adjust kar dunga.

**Kaise use karo:** Ek prompt ek baar Antigravity me daalo. Output/error paste karo,
agla prompt milega. Skip mat karna order — har step pichhle pe depend karta hai.

---

## Prompt 1 — Project Setup

```
Create a new Next.js 14 project using the App Router, TypeScript, and Tailwind CSS.
Install and configure: framer-motion, react-icons, react-hot-toast, clsx, tailwind-merge.
Set up this folder structure:
- app/ (layout.tsx, page.tsx, globals.css)
- components/
- lib/ (data.ts, utils.ts)
- public/ (for images, resume PDF, hero video)
Configure tailwind.config.ts with darkMode: "class" and a custom color palette named
"brand" using a deep indigo/violet gradient (#4F46E5 to #7C3AED) suitable for a
Generative AI engineer's portfolio — modern, technical, not generic corporate blue.
Do not add any content yet, just the working empty scaffold with the dev server running.
```

---

## Prompt 2 — Design Tokens & Layout Shell

```
In app/layout.tsx, set up:
- Inter font from next/font/google
- Metadata: title "Kishan Kushwaha | Generative AI & Agentic AI Engineer",
  description "Gen AI Engineer specializing in RAG pipelines, multi-agent systems,
  and production LLM applications."
- Dark mode by default with a toggle (create context/theme-context.tsx and
  components/theme-switch.tsx, persist choice using React state, no localStorage)
- A sticky/floating navbar (components/header.tsx) with sections:
  Home, About, Projects, Skills, Experience, Contact
- Smooth scroll behavior, scroll-based active section highlighting using
  Intersection Observer (react-intersection-observer)
Use the "brand" color palette from tailwind config for active states and accents.
```

---

## Prompt 3 — Hero Section

```
Create components/hero.tsx for the home section:
- Left/center: an autoplaying, looped, muted background video at public/hero-video.mp4
  (I already have this file) shown as a circular avatar-style video, 96x96 to 128x128px,
  with a subtle glowing border in the brand accent color, spring entrance animation
  using framer-motion
- Headline: "Hi, I'm Kishan Kushwaha" with animated gradient text on "Generative AI &
  Agentic AI Engineer"
- Subheadline: one line about building production RAG pipelines and multi-agent systems
  with LangChain, LangGraph, and cloud deployment
- Two CTA buttons: "View Projects" (scrolls to #projects) and "Download Resume"
  (downloads /Resume.pdf), styled with brand colors, hover scale animation
- Social icons: GitHub (github.com/krishcode11) and LinkedIn, opening in new tab
- Fully responsive: stack vertically on mobile
```

---

## Prompt 4 — About Section

```
Create components/about.tsx:
- A short, honest bio paragraph: self-taught Generative AI / Agentic AI developer,
  transitioned from a different academic background into AI engineering through
  hands-on project building, focused on shipping production-grade LLM applications
  end-to-end (RAG, agent orchestration, vector search, cloud deployment).
- Do NOT mention dropout or degree details here — this section should build
  credibility through what I DO, not my education history.
- Include 3-4 short "what I do" cards or bullet highlights: RAG Pipelines,
  Multi-Agent Systems, Production Deployment (Docker/Cloud), LLM Observability
- Fade/slide-in animation on scroll using framer-motion + whileInView
```

---

## Prompt 5 — Skills Section

```
Create components/skills.tsx displaying skills as animated pill/badge tags grouped
into categories (not a flat list):

Languages: Python, SQL
LLMs & Generative AI: Gemini API, OpenAI SDK, Groq API, Prompt Engineering, Function Calling
Agentic AI: LangGraph, Multi-Agent Systems, ReAct Pattern, Tool Calling, Agent Orchestration
RAG & Search: RAG Architecture, Semantic Search, Embeddings, Vector Search, Chunking
Frameworks: LangChain, FastAPI, Streamlit
Databases: Pinecone, Azure AI Search
Infra & Tools: Docker, Git, GitHub, Render, Azure

Each category as a labeled group, badges with a subtle hover-lift animation,
staggered entrance animation (framer-motion staggerChildren) when scrolled into view.
Only include skills listed above — do not add Kubernetes, PostgreSQL, MongoDB, or
Qdrant since I don't have project evidence for those yet.
```

---

## Prompt 6 — Projects Section (the most important section)

```
Create components/projects.tsx and components/project-card.tsx.
Data goes in lib/data.ts as a projectsData array with fields: title, role, dateRange,
description (2-3 sentence summary), metrics (array of short stat strings), tags
(tech stack array), githubUrl, liveUrl (optional).

Populate with these 3 projects:

1. Medico — AI Medical Assistant Chatbot
   Role: Gen AI Engineer | Jun 2026 - Jul 2026
   Description: Production RAG assistant that ingests 100+ page medical PDFs and
   answers questions grounded strictly in retrieved evidence.
   Metrics: ["1,000+ indexed chunks", "~40% better retrieval accuracy",
   "~60% fewer hallucinations", "<3s response time"]
   Tags: LangChain, FastAPI, Pinecone, Groq, Streamlit, Docker, Render
   GitHub: github.com/krishcode11 (link to the specific repo)

2. BrandGuardian AI — Multimodal LLMOps Compliance Platform
   Role: Gen AI Engineer | Jun 2026 - Jul 2026
   Description: Multimodal compliance auditing platform combining transcript
   analysis, OCR, and semantic retrieval across a 6-stage LangGraph workflow.
   Metrics: ["1,000+ policy chunks indexed", "<3 min report generation",
   "6+ orchestrated workflow stages", "full OpenTelemetry tracing"]
   Tags: Azure OpenAI, Azure AI Search, Azure Video Indexer, LangGraph, FastAPI, OpenTelemetry

3. AgentFlow — Multi-Agent Research Assistant
   Role: Agentic AI Engineer | May 2026 - Jun 2026
   Description: 4-agent research system that autonomously researches, analyzes,
   writes, and self-critiques reports using graph-based execution.
   Metrics: ["50+ sources per run", "<2 min report generation", "80%+ less manual research time"]
   Tags: LangGraph, LangChain, Gemini 2.5 Flash Lite, Tavily, Streamlit

Each card: project title, role/date, description, 3-4 metric chips (visually distinct,
brand-colored), tech tag pills, GitHub/live links with icons. Grid layout, 3 columns
on desktop, 1 on mobile, hover-lift + shadow animation on each card.
```

---

## Prompt 7 — Experience / Education Section

```
Create components/experience.tsx as a vertical timeline (use plain divs + framer-motion,
no external timeline library) with two entries:

1. "Self-Directed AI Engineering Path" | 2024 - Present
   Description: Transitioned into Generative AI and Agentic AI engineering through
   intensive self-study and shipping production projects (RAG systems, multi-agent
   orchestration, cloud deployment) — listing the 3 projects above as proof of work.

2. "Guru Gobind Singh Indraprastha University" | 2022 - 2024
   Description: Coursework in healthcare technology and image processing before
   transitioning to software and AI engineering.

Keep the education entry factual and brief — do not use the word "dropout" in the UI,
just show the date range honestly. Style: alternating left/right timeline on desktop,
single column on mobile, connecting line in brand color.
```

---

## Prompt 8 — Contact Section

```
Create components/contact.tsx with a working contact form (name, email, message)
using a Next.js Server Action (actions/sendEmail.ts) and the Resend API to send
emails to my inbox. Show a loading state on submit and a success/error toast using
react-hot-toast. Include my email as a plain mailto link and LinkedIn/GitHub icons
as an alternative. Validate inputs client-side before submission.
```

---

## Prompt 9 — AI Chatbot (Groq-powered)

```
Create an app/api/chat/route.ts server route that calls Groq's OpenAI-compatible
chat completions endpoint (model: llama-3.3-70b-versatile) using a GROQ_API_KEY
environment variable (never expose it client-side).

Give the model a system prompt describing who I am (Kishan Kushwaha, Gen AI/Agentic
AI Engineer, projects: Medico, BrandGuardian, AgentFlow, skills as listed in
lib/data.ts) so it can answer visitor questions about my work accurately, and tell
it to say "I'm not sure, please use the contact form" if it doesn't know something
rather than making things up.

Create components/chatbot.tsx: a floating chat bubble bottom-right, brand-colored,
expands into a chat window with message history, typing indicator, and an input box.
Use framer-motion for the open/close animation.
Add a .env.local.example file listing GROQ_API_KEY as a required variable.
```

---

## Prompt 10 — SEO, Performance & Polish

```
Add SEO essentials: Open Graph tags, Twitter card meta, a favicon, sitemap.xml,
robots.txt. Add a subtle page-load animation (staggered fade-in of hero elements).
Run through the whole site and fix: mobile responsiveness at 375px width, color
contrast in both light and dark mode, and make sure all framer-motion animations
respect prefers-reduced-motion. Optimize the hero video with a poster image fallback.
```

---

## Prompt 11 — Deploy

```
Prepare this project for deployment on Vercel: add a .env.example, a README with
setup instructions, and verify `npm run build` completes with no errors or warnings.
List any environment variables I need to set in the Vercel dashboard (GROQ_API_KEY,
RESEND_API_KEY).
```

---

### Notes for you (Kishan)
- Prompt 6 (Projects) is the one that matters most for recruiters — don't rush it.
- Har step ke baad build check karna: `npm run build` — agar error aaye, error paste kar dena, fix bata dunga.
- Resume ke red flags (skills without evidence) is portfolio me repeat mat karna — jo skills list ki hain Prompt 5 me, wahi honest hain.
