"use client";

import { throttle } from "lodash-es";
import { useLayoutEffect, useState } from "react";
import { BiChevronUp } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";

export function BackToTopButton({ className }: { className?: string }) {
  const [scrollTop, setScrollTop] = useState(
    typeof window === "undefined" ? undefined : window.scrollY
  );
  const show = scrollTop !== undefined && scrollTop > 150;

  useLayoutEffect(() => {
    const handleScroll = throttle(() => setScrollTop(window?.scrollY), 1000);
    window?.addEventListener("scroll", handleScroll);
    return () => window?.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      {/* Button is semi-transparent until the cursor hovers over this div, but only on lg and above */}
      <div className="peer fixed -bottom-12 -left-12 h-48 w-48 rounded-full" />
      <Button
        onClick={() => document.body.scrollIntoView({ behavior: "smooth" })}
        icon={<BiChevronUp className="h-10 w-10" />}
        className={twMerge(
          "pointer-events-none p-0.5 opacity-0 shadow-md transition-all sm:p-0.5",
          show &&
            "pointer-events-auto opacity-100 hover:opacity-100 focus:opacity-100 peer-hover:opacity-100 lg:opacity-50",
          className
        )}
      />
    </>
  );
}
