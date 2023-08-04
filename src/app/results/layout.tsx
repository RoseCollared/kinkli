import { BackToTopButton } from "@kinklist/components/back-to-top-button";
import { ExportButton } from "@kinklist/components/export-button";
import { Legend } from "@kinklist/components/legend";
import Link from "next/link";
import type { ReactNode } from "react";

export default function ResultsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="flex w-full flex-col items-center justify-center gap-x-8 gap-y-4 px-12 pt-12 sm:flex-row sm:justify-between sm:pb-2 sm:pt-16">
        <div className="hidden basis-0 sm:block sm:grow" />

        <Link href="/">
          <h1 className="text-4xl font-bold drop-shadow-sm xs:text-5xl">
            Kinklist
          </h1>
        </Link>

        <div className="basis-0 items-center justify-end sm:flex sm:grow">
          <ExportButton />
        </div>
      </header>
      <Legend />
      <main>{children}</main>
      <BackToTopButton />
    </>
  );
}
