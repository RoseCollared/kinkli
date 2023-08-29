import { BackToTopButton } from "@kinklist/components/back-to-top-button";
import { Legend } from "@kinklist/components/legend";
import type { ReactNode } from "react";
import { CopyButton, ImageButton } from "./buttons";

export default function ResultsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="flex w-full flex-col items-center justify-center gap-x-8 gap-y-4 px-12 pt-12 sm:flex-row sm:justify-between sm:pb-2 sm:pt-16">
        <div className="hidden basis-0 sm:block sm:grow" />

        <h1 className="text-5xl font-bold drop-shadow-sm">Kinklist</h1>

        <div className="flex basis-0 flex-wrap items-center justify-center gap-2 sm:grow sm:flex-nowrap sm:justify-end">
          <CopyButton />
          <ImageButton />
        </div>
      </header>
      <Legend />
      <main>{children}</main>
      <BackToTopButton />
    </>
  );
}
