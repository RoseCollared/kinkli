import { BackToTopButton } from "@kinklist/components/back-to-top-button";
import { Legend } from "@kinklist/components/legend";
import { ShareButton } from "@kinklist/components/share-button";
import type { ReactNode } from "react";

// This route group exists because the layout is different from the results page

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="flex w-full flex-col items-center justify-center gap-x-8 gap-y-6 px-12 pb-2 pt-12 sm:flex-row sm:justify-between sm:pt-16">
        <div className="hidden grow sm:block">
          {/* Placeholder which grows to ensure title is centered */}
        </div>

        <h1 className="text-5xl font-bold drop-shadow-sm">Kinklist</h1>

        <div className="flex basis-0 justify-end sm:grow">
          <ShareButton />
        </div>
      </header>
      <Legend />
      <main>{children}</main>
      <BackToTopButton />
    </>
  );
}
