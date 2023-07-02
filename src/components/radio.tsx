"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Radio = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const colorMap = {
    "1": "bg-red-100 before:bg-red-500", // 😬
    "2": "bg-orange-100 before:bg-orange-400", // 😟
    "3": "bg-yellow-100 before:bg-yellow-500", // 🫤
    "4": "bg-green-100 before:bg-green-400", // 🤔
    "5": "bg-sky-100 before:bg-sky-400", // 😏
    "6": "bg-violet-100 before:bg-violet-500", // 🥰
    "7": "bg-pink-100 before:bg-pink-400", // 🥵
  };
  return (
    <input
      type="radio"
      ref={ref}
      {...props}
      className={twMerge(
        "relative h-5 w-5 appearance-none rounded-full border-2 border-gray-400 transition-colors before:absolute before:inset-0.5 before:rounded-full before:bg-rose-400 before:opacity-0 before:transition-opacity checked:border-gray-500 checked:before:opacity-100 hover:before:opacity-70 checked:hover:before:opacity-100",
        props.value && colorMap[props.value as string],
        props.className
      )}
    />
  );
});
Radio.displayName = "Radio";
