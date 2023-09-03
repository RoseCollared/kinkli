import type { motion } from "framer-motion";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

// FIXME: types do not prevent passing wrong ref to element, for example:
// const aRef = useRef<HTMLAnchorElement>(null);
// return <Button ref={aRef} />;
// This does not trigger a type error, but it should

export type ButtonVariant = keyof typeof variantStyles;

// See: https://stackoverflow.com/questions/72617016/forwarded-ref-with-button-or-anchor-types-typescript
export type ButtonProps = {
  icon?: ReactNode;
  variant?: ButtonVariant;
} & (
  | ({ as?: "button" } & ComponentPropsWithoutRef<"button">)
  | ({ as: "a" } & ComponentPropsWithoutRef<"a">)
  | ({ as: typeof motion.button } & Omit<
      ComponentPropsWithoutRef<typeof motion.button>,
      "children"
    > & { children?: ReactNode })
  | ({ as: typeof motion.a } & Omit<
      ComponentPropsWithoutRef<typeof motion.a>,
      "children"
    > & { children?: ReactNode })
);

const variantStyles = {
  primary:
    "bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700 dark:bg-red-700 dark:hover:bg-red-800 dark:active:bg-red-900",
  secondary:
    "border-2 text-rose-500 border-rose-500 hover:bg-rose-100 active:bg-rose-200 active:text-rose-600 active:border-rose-600 dark:text-gray-100 dark:border-red-800 dark:hover:bg-red-950/40 dark:active:bg-red-950/80 dark:active:text-gray-100 dark:active:border-red-700",
  tertiary:
    "text-rose-500 hover:bg-rose-100 active:bg-rose-200 active:text-rose-600 shadow-none dark:text-gray-100 dark:hover:bg-red-950 dark:active:bg-red-900 dark:active:text-gray-100",
} as const;

export const Button = forwardRef<unknown, ButtonProps>((props, ref) => {
  const {
    as = "button",
    variant = "primary",
    icon,
    className,
    children,
    ...restProps
  } = props;

  const isIconButton = icon && !children;

  const Component = as as ElementType;

  return (
    <Component
      ref={ref}
      {...restProps}
      className={twMerge(
        "whitespace-nowrap rounded-lg px-4 py-2.5 text-lg font-semibold leading-none shadow transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 sm:px-5 sm:text-xl",
        isIconButton && "px-2.5 sm:px-2.5",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-center justify-center gap-2">
        {children}
        {icon}
      </div>
    </Component>
  );
});

Button.displayName = "Button";
