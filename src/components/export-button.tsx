"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "./button";

export function ExportButton() {
  const searchParams = useSearchParams();

  return (
    <Link
      href={{ pathname: "/results/export", search: searchParams.toString() }}
      tabIndex={-1}
    >
      <Button>Export</Button>
    </Link>
  );
}
