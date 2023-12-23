import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: ReactNode;
}

export function Section({ className, children, ...restProps }: SectionProps) {
  return (
    <section
      className={twMerge(
        "rounded-xl border-2 border-rose-300 bg-white px-2.5 py-4 text-gray-700 shadow-xl shadow-rose-100 dark:border-red-700 dark:bg-zinc-900 dark:text-gray-100 dark:shadow-red-950 xs:p-6 lg:p-4",
        className
      )}
      {...restProps}
    >
      {children}
    </section>
  );
}

export interface SectionTitleProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: ReactNode;
}

function SectionTitle({
  className,
  children,
  ...restProps
}: SectionTitleProps) {
  return (
    <h2
      className={twMerge(
        // Padding + negative margin to prevent headbutt
        "-mt-10 pt-10 text-lg lg:text-base uppercase font-semibold text-gray-500 drop-shadow-sm dark:text-gray-400 tracking-wide",
        className
      )}
      {...restProps}
    >
      {children}
    </h2>
  );
}

Section.Title = SectionTitle;
