"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { MoonIcon } from "@radix-ui/react-icons";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="flex flex-col min-h-screen min-w-screen">
      <div className="flex flex-row items-center justify-between p-4">
        <h1 className="text-4xl font-bold">Teddy Blanco</h1>
        <Button variant="ghost" size="icon">
          <MoonIcon className="h-6 w-6" onClick={() => toggleTheme()} />
        </Button>
      </div>
    </main>
  );
}
