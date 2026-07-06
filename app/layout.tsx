import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import Header from "../components/header";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kishan-kushwaha.vercel.app"),
  title: "Kishan Kushwaha | Generative AI & Agentic AI Engineer",
  description:
    "Gen AI Engineer specializing in RAG pipelines, multi-agent systems, and production LLM applications. View my projects: Medico, BrandGuardian AI, AgentFlow.",
  keywords: [
    "Generative AI Engineer",
    "Agentic AI",
    "RAG pipelines",
    "LangGraph",
    "LangChain",
    "Multi-agent systems",
    "LLM applications",
    "Kishan Kushwaha",
  ],
  authors: [{ name: "Kishan Kushwaha", url: "https://github.com/krishcode11" }],
  creator: "Kishan Kushwaha",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Kishan Kushwaha | Generative AI & Agentic AI Engineer",
    description:
      "Gen AI Engineer specializing in RAG pipelines, multi-agent systems, and production LLM applications.",
    siteName: "Kishan Kushwaha Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kishan Kushwaha — Generative AI & Agentic AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kishan Kushwaha | Generative AI & Agentic AI Engineer",
    description:
      "Gen AI Engineer specializing in RAG pipelines, multi-agent systems, and production LLM applications.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1a1a2e",
                color: "#f0f0ff",
                border: "1px solid rgba(79,70,229,0.3)",
                borderRadius: "12px",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
