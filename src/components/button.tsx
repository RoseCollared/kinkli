import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonVariant = keyof typeof variantStyles;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  variant?: ButtonVariant;
}

const variantStyles = {
  primary: "bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700",
  secondary:
    "text-rose-500 border-2 border-rose-500 hover:bg-rose-100 active:bg-rose-200 active:text-rose-600 active:border-rose-600",
  tertiary:
    "text-rose-500 hover:bg-rose-100 active:bg-rose-200 active:text-rose-600 shadow-none",
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = "primary",
      icon,
      className,
      children,
      ...restProps
    } = props;
    return (
      <button
        ref={ref}
        type="button"
        {...restProps}
        className={twMerge(
          "whitespace-nowrap rounded-lg px-4 py-2.5 text-lg font-semibold leading-none shadow transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 sm:px-5 sm:text-xl",
          variantStyles[variant],
          className
        )}
      >
        <div className="flex items-center justify-center gap-2">
          {children}
          {icon}
        </div>
      </button>
    );
  }
);
Button.displayName = "Button";

export function IconButton(props: ButtonProps) {
  const { className, ...restProps } = props;
  return (
    <Button className={twMerge("px-2.5 sm:px-2.5", className)} {...restProps} />
  );
}
