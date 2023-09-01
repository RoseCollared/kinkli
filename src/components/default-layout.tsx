import type { ReactNode } from "react";
import { BackToTopButton } from "./back-to-top-button";
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
        <div className="hidden grow sm:block">
          {/* Placeholder which grows to ensure title is centered */}
        </div>

        <h1 className="text-5xl font-bold drop-shadow-sm">Kinklist</h1>

        <div className="flex basis-0 flex-wrap items-center justify-center gap-2 sm:grow sm:flex-nowrap sm:justify-end">
          {buttons}
        </div>
      </header>
      {legend}
      <main>{children}</main>
      <BackToTopButton />
    </>
  );
}
