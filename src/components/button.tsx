import { ButtonHTMLAttributes } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, ClassNameValue> = {
  primary: "bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700",
  secondary:
    "bg-transparent text-rose-500 border-4 border-rose-500 hover:bg-rose-100 active:bg-rose-200 active:text-rose-600 active:border-rose-600",
};

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
        "whitespace-nowrap leading-none rounded-lg px-6 py-3 text-xl font-semibold shadow transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300",
        variantStyles[variant],
        className
      )}
    />
  );
}
