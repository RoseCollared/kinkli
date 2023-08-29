import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kinklist",
  description: "The kinkiest kinklist of all kinky lists",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen flex-col items-center bg-rose-50 text-gray-800 transition-colors duration-500 dark:bg-zinc-800 dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
