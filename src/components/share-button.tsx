"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "./button";

export function ShareButton() {
  const searchParams = useSearchParams();

  return (
    <Link href={{ pathname: "/results", search: searchParams.toString() }}>
      <Button>Share</Button>
    </Link>
  );
}
