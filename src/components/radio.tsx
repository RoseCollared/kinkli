"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Radio = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      type="radio"
      ref={ref}
      {...props}
      className={twMerge(
        "relative h-5 w-5 appearance-none rounded-full border-2 border-gray-400 before:absolute before:inset-0.5 before:rounded-full before:bg-rose-400 before:opacity-0 before:transition-opacity checked:before:opacity-100 hover:before:opacity-70 checked:hover:before:opacity-100",
        props.className
      )}
    />
  );
});
Radio.displayName = "Radio";
