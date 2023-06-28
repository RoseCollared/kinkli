import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Radio(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="radio"
      {...props}
      className={twMerge(
        "relative h-5 w-5 appearance-none rounded-full border-2 border-gray-400 before:absolute before:inset-0.5 before:rounded-full before:bg-rose-400 before:opacity-0 before:transition-opacity checked:before:opacity-100 hover:before:opacity-70 checked:hover:before:opacity-100",
        props.className
      )}
    />
  );
}
