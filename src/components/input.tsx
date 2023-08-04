"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...restProps } = props;
  return <input ref={ref} className={twMerge("bg-white border-2 border-black/20 rounded-lg px-1.5 leading-loose text-ellipsis", className)} {...restProps} />;
});
Input.displayName = "Input";
