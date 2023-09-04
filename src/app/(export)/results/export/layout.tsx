import { DarkModeButton } from "@kinkli/components/dark-mode-button";
import { ReactNode } from "react";

export default function ExportLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <header>
        <DarkModeButton className="absolute left-6 top-6" />
      </header>
      <main className="min-h-screen w-full bg-white dark:bg-zinc-900">
        {children}
      </main>
    </>
  );
}
