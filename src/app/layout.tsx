import { ThemeProvider } from "@kinkli/components/theme-provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kinkli",
  description: "Enter your kinks and share your results!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // Suppress hydration warnings because next-themes updates the html element
    // See: https://github.com/pacocoursey/next-themes/blob/cd67bfa20ef6ea78a814d65625c530baae4075ef/README.md#with-app
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-screen flex-col items-center bg-rose-50 text-gray-800 transition-colors duration-700 dark:bg-zinc-800 dark:text-gray-100`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
