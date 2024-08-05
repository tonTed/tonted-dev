import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import MainNav from "@/components/main-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tonTed.dev",
  description: "tonTed.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={inter.className}>
          <MainNav />
          <main className="flex flex-col items-center min-w-screen p-4">
            {children}
          </main>
        </body>
      </html>
    </ThemeProvider>
  );
}
