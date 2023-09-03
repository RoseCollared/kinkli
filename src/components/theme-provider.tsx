"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Unfortunately, this has to be a client component, which means we don't get
 * to have server components deeper down the tree :(
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <NextThemeProvider attribute="class">{children}</NextThemeProvider>;
}
