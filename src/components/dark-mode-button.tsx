"use client";

import { useIsFirstRender } from "@kinkli/hooks/use-is-first-render";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";

export function DarkModeButton({ className }: { className?: string }) {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const isFirstRender = useIsFirstRender();

  const toggleTheme = useCallback(() => {
    // @ts-expect-error wait for TS to update DOM types
    if (typeof document === "undefined" || !document.startViewTransition) {
      // View transitions are not supported, so don't do anything fancy
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    // Disable transitions on the body element to ensure the "new" view
    // transition is in the final state as soon as the view transition starts
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
        className={twMerge(
          "pointer-events-none invisible p-1 sm:p-1",
          className
        )}
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
        className={twMerge("p-1 sm:p-1", className)}
      />
    </AnimatePresence>
  );
}
