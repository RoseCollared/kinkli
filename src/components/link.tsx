import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface LinkProps extends NextLinkProps {
  className?: string;
  children?: ReactNode;
}

export function Link({ className, ...restProps }: LinkProps) {
  return (
    <NextLink
      className={twMerge(
        "text-rose-500 underline underline-offset-2 transition-colors hover:text-rose-600 active:text-rose-700 dark:text-white dark:decoration-red-600 dark:hover:text-red-300 dark:active:text-red-400",
        className
      )}
      {...restProps}
    />
  );
}
