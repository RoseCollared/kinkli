"use client";

import { useIsFirstRender } from "@kinklist/hooks/use-is-first-render";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";

export function DarkModeButton() {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const isFirstRender = useIsFirstRender();

  const toggleTheme = useCallback(() => {
    // @ts-expect-error wait for TS to update DOM types
    if (typeof document === "undefined" || !document.startViewTransition) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    // Disable transitions on the body element because it kills performance
    // when used in combination with the masking view transition we do
    document.body.style.transition = "none";

    // @ts-expect-error wait for TS to update DOM types
    document.startViewTransition(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    });
  }, [theme, setTheme]);

  // On first render, the theme may be wrong so we can't render
  // See: https://github.com/pacocoursey/next-themes/blob/cd67bfa20ef6ea78a814d65625c530baae4075ef/README.md#avoid-hydration-mismatch
  if (isFirstRender) {
    // This is an invisible placeholder button which takes up the same amount
    // of space as the real button
    return (
      <Button
        aria-hidden
        disabled
        icon={<div className="h-8 w-8" />}
        className="pointer-events-none invisible p-1 sm:p-1"
      />
    );
  }

  return (
    <AnimatePresence>
      <Button
        as={motion.button}
        onClick={() => toggleTheme()}
        aria-label={
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
        icon={
          theme === "dark" ? (
            <BiSun className="h-8 w-8" />
          ) : (
            <BiMoon className="h-8 w-8" />
          )
        }
        variant="tertiary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={twMerge(
          "p-1 transition-opacity sm:p-1",
          isFirstRender && "opacity-0"
        )}
      />
    </AnimatePresence>
  );
}
