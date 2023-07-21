import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonVariant = keyof typeof variantStyles;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles = {
  primary: "bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700",
  secondary:
    "text-rose-500 border-4 border-rose-500 hover:bg-rose-100 active:bg-rose-200 active:text-rose-600 active:border-rose-600",
  tertiary:
    "text-rose-500 hover:bg-rose-100 active:bg-rose-200 active:text-rose-600 shadow-none",
} as const;

export function Button({
  variant = "primary",
  className,
  ...restProps
}: ButtonProps) {
  return (
    <button
      type="button"
      {...restProps}
      className={twMerge(
        "whitespace-nowrap rounded-lg px-4 py-2.5 text-lg font-semibold leading-none shadow transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 sm:px-6 sm:text-xl",
        variantStyles[variant],
        className
      )}
    />
  );
}
