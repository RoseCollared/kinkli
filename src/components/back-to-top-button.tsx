import { throttle } from "lodash-es";
import { useLayoutEffect, useState } from "react";
import { BiChevronUp } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";

export function BackToTopButton() {
  const [scrollTop, setScrollTop] = useState(window?.scrollY);
  const show = scrollTop !== undefined && scrollTop > 150;

  useLayoutEffect(() => {
    const handleScroll = throttle(() => setScrollTop(window?.scrollY), 1000);
    window?.addEventListener("scroll", handleScroll);
    return () => window?.removeEventListener("scroll", handleScroll);
  });

  return (
    <Button
      className={twMerge(
        "pointer-events-none fixed bottom-6 left-6 p-0.5 opacity-0 shadow-md transition-opacity",
        show && "pointer-events-auto opacity-100"
      )}
      onClick={() => document.body.scrollIntoView({ behavior: "smooth" })}
    >
      <BiChevronUp className="h-10 w-10" />
    </Button>
  );
}