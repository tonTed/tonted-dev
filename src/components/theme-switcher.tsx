"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button variant="ghost" size="icon" onClick={() => toggleTheme()}>
      {theme === "light" ? (
        <MoonIcon className="h-6 w-6" />
      ) : (
        <SunIcon className="h-6 w-6" />
      )}
    </Button>
  );
}

export default ThemeSwitcher;
