"use client";

import { useTheme } from "@/context/theme-context";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { motion } from "framer-motion";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      id="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative flex items-center justify-center w-9 h-9 rounded-full glass text-brand-300 hover:text-brand-400 hover:bg-brand-500/10 transition-all duration-200"
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "dark" ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}
      </motion.div>
    </motion.button>
  );
}
