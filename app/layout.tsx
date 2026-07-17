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

export const metadata: Metadata = {
  title: "Thanh Trần | Product Owner & Product Manager",
  description:
    "Product Owner at FPT IS leading urban mobility, digital payment, smart city, and enterprise platforms in Ho Chi Minh City.",
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
    title: "Thanh Trần | Product Owner & Product Manager",
    description:
      "Product Owner at FPT IS building impactful digital products for urban mobility, payments, and enterprise clients.",
    siteName: "Thanh Trần Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thanh Trần | Product Owner & Product Manager",
    description:
      "Product Owner at FPT IS building impactful digital products for urban mobility, payments, and enterprise clients.",
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
