"use client";

import { Button } from "@kinklist/components/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BiCheck, BiImage, BiLink } from "react-icons/bi";
import useClipboard from "react-use-clipboard";

export function CopyButton() {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const [isCopied, copy] = useClipboard(url, {
    successDuration: 2000,
  });

  return (
    <Button
      icon={isCopied ? <BiCheck className="h-6 w-6" /> : <BiLink />}
      onClick={() => copy()}
    >
      <span className="hidden xl:inline">
        {isCopied ? "Copied" : "Copy link"}
      </span>
      <span className="inline xl:hidden">{isCopied ? "Copied" : "Copy"}</span>
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