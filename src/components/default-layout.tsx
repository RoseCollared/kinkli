import type { ReactNode } from "react";
import { BackToTopButton } from "./back-to-top-button";
import { DarkModeButton } from "./dark-mode-button";

interface DefaultLayoutProps {
  buttons?: ReactNode;
  children?: ReactNode;
}

export function DefaultLayout(props: DefaultLayoutProps) {
  const { buttons, children } = props;
  return (
    <>
      <header className="flex w-full flex-col items-center justify-center gap-x-8 gap-y-6 px-12 pb-2 pt-12 sm:flex-row sm:justify-between sm:pt-16">
        {/* TODO: put dark mode in hamburger menu on small screens */}
        {/* TODO: also include legend in hamburger menu? */}
        <div className="flex grow items-center">
          <DarkModeButton className="absolute left-6 top-6 sm:static" />
        </div>

        <h1 className="text-5xl font-bold drop-shadow-sm">Kinkli</h1>

        <div className="flex basis-0 flex-wrap items-center justify-center gap-2 sm:grow sm:flex-nowrap sm:justify-end">
          {buttons}
        </div>
      </header>
      {children}
      <BackToTopButton className="fixed bottom-6 left-6" />
    </>
  );
}
