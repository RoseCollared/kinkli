import { twMerge } from "tailwind-merge";

export function Loader({ className }: { className?: string }) {
  return (
    <span
      className={twMerge(
        "inline-block h-12 w-12 animate-spin rounded-[50%] border-[5px] border-rose-300 border-b-transparent dark:border-red-700 dark:border-b-transparent",
        className
      )}
    />
  );
}
