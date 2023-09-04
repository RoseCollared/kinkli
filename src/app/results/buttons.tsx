"use client";

import { Button } from "@kinkli/components/button";
import { useIsFirstRender } from "@kinkli/hooks/use-is-first-render";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BiCheck, BiImage, BiLink } from "react-icons/bi";
import useClipboard from "react-use-clipboard";

export function CopyButton() {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const [isCopied, copy] = useClipboard(url, {
    successDuration: 2500,
  });

  const isFirstRender = useIsFirstRender();

  return (
    // Not using Button `icon` prop because we need to animate it
    <Button as={motion.button} layout onClick={() => copy()}>
      <motion.div
        layout
        key={String(isCopied)}
        initial={isFirstRender ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-2"
      >
        <span className="hidden xl:inline">
          {isCopied ? "Copied" : "Copy link"}
        </span>
        <span className="inline xl:hidden">{isCopied ? "Copied" : "Copy"}</span>
        {isCopied ? <BiCheck className="h-6 w-6" /> : <BiLink />}
      </motion.div>
    </Button>
  );
}

export function ImageButton() {
  // Pass only the `answers` search param to the link
  const searchParams = useSearchParams();
  const linkParams = new URLSearchParams();
  const answers = searchParams.get("answers");
  if (answers) linkParams.set("answers", answers);

  return (
    <Link
      href={{ pathname: "/results/export", search: linkParams.toString() }}
      tabIndex={-1}
    >
      <Button icon={<BiImage />}>
        <span className="hidden xl:inline">Get image</span>
        <span className="inline xl:hidden">Image</span>
      </Button>
    </Link>
  );
}
