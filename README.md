# Thanh Trần — Product Owner Portfolio

A personal portfolio for **Thanh Trần**, Product Owner and Product Manager at FPT IS.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Groq · Resend

## Features

- 🎨 Dark/light mode with glassmorphism design
- 🚀 Animated hero with video avatar
- 📊 Projects with real performance metrics
- 🧠 AI chatbot powered by Groq (Llama 3.3 70B)
- 📬 Contact form via Resend email API
- 🔍 Full SEO (OG tags, sitemap, robots.txt)
- 📱 Fully responsive at 375px+

## Setup

### 1. Clone and install

```bash
npm install
```

### 2. Environment variables

Copy `.env.local.example` to `.env.local` and fill in your keys:

```bash
cp .env.local.example .env.local
```

| Variable | Where to get it |
|---|---|
| `GROQ_API_KEY` | [console.groq.com](https://console.groq.com) — free tier available |
| `RESEND_API_KEY` | [resend.com](https://resend.com) — free tier available |

### 3. Add your assets to `/public/`

- `hero-video.mp4` — your avatar/intro video (circular, looped)
- `Resume.pdf` — your resume PDF
- `hero-poster.jpg` — fallback image for the hero video
- `og-image.png` — 1200×630px Open Graph image
- `favicon.ico` — your favicon

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build

```bash
npm run build
```

## Deploy on Vercel

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `GROQ_API_KEY`
   - `RESEND_API_KEY`
4. Deploy!

## Customization

- Edit project data, skills, and experience in [`lib/data.ts`](lib/data.ts)
- Update contact email in [`actions/sendEmail.ts`](actions/sendEmail.ts)
- Update your LinkedIn URL in `components/hero.tsx` and `components/contact.tsx`

## License

MIT
