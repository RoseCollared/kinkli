"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Title() {
  const pathname = usePathname();

  const content = (
    <h1 className="text-4xl font-bold drop-shadow-sm xs:text-5xl">Kinklist</h1>
  );

  // Don't render a link if we're already on the home page
  if (pathname === "/") {
    return content;
  }

  return <Link href="/">{content}</Link>;
}
