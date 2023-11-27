import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface SectionProps {
  className?: string;
  children?: ReactNode;
}

export function Section({ className, children }: SectionProps) {
  return (
    <section
      className={twMerge(
        "rounded-xl border-2 border-rose-300 bg-white px-2.5 py-4 text-gray-600 shadow-xl shadow-rose-100 dark:border-red-700 dark:bg-zinc-900 dark:text-gray-200 dark:shadow-red-950 xs:p-6 lg:p-4",
        className
      )}
    >
      {children}
    </section>
  );
}

export interface SectionTitleProps {
  className?: string;
  children?: ReactNode;
}

function SectionTitle({ className, children }: SectionTitleProps) {
  return (
    <h2
      className={twMerge(
        "text-2xl font-semibold text-gray-800 drop-shadow-sm dark:text-gray-100 xs:text-3xl lg:text-2xl",
        className
      )}
    >
      {children}
    </h2>
  );
}

Section.Title = SectionTitle;
