import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={twMerge(
        "rounded-lg bg-rose-500 px-6 py-3 text-xl font-semibold text-white shadow transition-colors hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 active:bg-rose-700",
        props.className
      )}
    />
  );
}
