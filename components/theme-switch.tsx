"use client";

import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { useTheme } from "@/context/theme-context";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="icon-button theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
      <span key={theme}>
        {theme === "dark" ? <RiSunLine aria-hidden="true" /> : <RiMoonLine aria-hidden="true" />}
      </span>
    </button>
  );
}
