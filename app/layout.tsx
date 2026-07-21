import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import Header from "../components/header";
import Footer from "../components/footer";
import { Toaster } from "react-hot-toast";
import { MotionConfig } from "framer-motion";

const themeInitScript = `try{var t=localStorage.getItem("portfolio-theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(t==="dark"){document.documentElement.classList.add("dark")}}catch(e){}`;

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Thanh Trần | Product Manager & Product Owner",
  description:
    "Product Manager and Deputy Head of Metro Solutions at FPT IS with 14+ years in software, leading smart mobility, digital payment, and enterprise platforms in Ho Chi Minh City.",
  keywords: [
    "Product Owner",
    "Product Manager",
    "Product Management",
    "Scrum",
    "Smart City",
    "Urban Mobility",
    "Digital Payments",
    "Thanh Tran",
  ],
  authors: [{ name: "Thanh Trần", url: "https://www.linkedin.com/in/thanh-tr%E1%BA%A7n-5815a0112/" }],
  creator: "Thanh Trần",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Thanh Trần | Product Manager & Product Owner",
    description:
      "Product Manager at FPT IS building impactful digital products for smart mobility, payments, and enterprise clients.",
    siteName: "Thanh Trần Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Thanh Trần — Product Manager & Product Owner at FPT IS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thanh Trần | Product Manager & Product Owner",
    description:
      "Product Manager at FPT IS building impactful digital products for smart mobility, payments, and enterprise clients.",
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
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <MotionConfig reducedMotion="user">
          <ThemeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                className: "portfolio-toast",
              }}
            />
          </ThemeProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
