import type { ReactNode } from "react";
import { BackToTopButton } from "./back-to-top-button";
import { DarkModeButton } from "./dark-mode-button";
import { Legend } from "./legend";

interface DefaultLayoutProps {
  buttons?: ReactNode;
  legend?: ReactNode;
  children?: ReactNode;
}

const defaultLegend = <Legend />;

export function DefaultLayout(props: DefaultLayoutProps) {
  const { buttons, legend = defaultLegend, children } = props;
  return (
    <>
      <header className="flex w-full flex-col items-center justify-center gap-x-8 gap-y-6 px-12 pb-2 pt-12 sm:flex-row sm:justify-between sm:pt-16">
        {/* TODO: put dark mode in hamburger menu on small screens */}
        {/* TODO: also include legend in hamburger menu? */}
        <div className="flex grow items-center">
          <DarkModeButton className="absolute top-6 left-6 sm:static" />
        </div>

        <h1 className="text-5xl font-bold drop-shadow-sm">Kinkli</h1>

        <div className="flex basis-0 flex-wrap items-center justify-center gap-2 sm:grow sm:flex-nowrap sm:justify-end">
          {buttons}
        </div>
      </header>
      {legend}
      <main>{children}</main>
      <BackToTopButton className="fixed bottom-6 left-6" />
    </>
  );
}
