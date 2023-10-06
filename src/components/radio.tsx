"use client";

import { useIsExport } from "@kinkli/context/export-context";
import { forwardRef, type InputHTMLAttributes } from "react";
import { useFormContext, type UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { labelMap } from "@kinkli/answer-labels";

const colorMap = {
  "0": "bg-white dark:bg-zinc-800 dark:border-white/30", // ⬜️
  "1": "bg-red-100 before:bg-red-500 dark:bg-red-950/60 dark:border-red-800 dark:before:bg-red-500 dark:checked:border-red-800", // 🟥
  "2": "bg-orange-100 before:bg-orange-400 dark:bg-orange-950/60 dark:border-orange-800 dark:before:bg-orange-400 dark:checked:border-orange-800", // 🟧
  "3": "bg-yellow-100 before:bg-yellow-500 dark:bg-yellow-950/60 dark:border-yellow-700 dark:before:bg-yellow-400 dark:checked:border-yellow-700", // 🟨
  "4": "bg-green-100 before:bg-green-400 dark:bg-green-950/60 dark:border-green-700 dark:before:bg-green-400 dark:checked:border-green-700", // 🟩
  "5": "bg-sky-100 before:bg-sky-400 dark:bg-sky-950/60 dark:border-sky-700 dark:before:bg-sky-400 dark:checked:border-sky-700", // 🟦
  "6": "bg-violet-100 before:bg-violet-500 dark:bg-violet-950/60 dark:border-violet-700 dark:before:bg-violet-400 dark:checked:border-violet-700", // 🟪
  "7": "bg-pink-100 before:bg-pink-400 dark:bg-pink-950/60 dark:border-pink-700 dark:before:bg-pink-400 dark:checked:border-pink-700", // 🩷
};

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  /** Whether to render the small variant regardless of screen size */
  alwaysSmall?: boolean;
}

/**
 * Radio button used specifically for the form questions and results.
 * Not designed as a general-purpose radio button.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { name, value, className, alwaysSmall, ...restProps } = props;
  const isExport = useIsExport();

  // This will be undefined when not used in a <FormProvider>
  const formContext = useFormContext() as UseFormReturn | undefined;

  const valueOfCheckedInput =
    formContext && name ? formContext.watch(name) : undefined;
  const isChecked =
    props.checked || (value !== undefined && value === valueOfCheckedInput);

  const sharedStyles = twMerge(
    "relative h-7 w-7 appearance-none rounded-full border-2 border-black/20 before:absolute before:inset-1 before:rounded-full before:opacity-0 before:transition-opacity checked:border-black/40 checked:before:opacity-100 hover:before:opacity-70 checked:hover:before:opacity-100 xs:h-8 xs:w-8 lg:h-5 lg:w-5 lg:before:inset-0.5 dark:hover:before:opacity-50 dark:checked:hover:before:opacity-100",
    alwaysSmall && "h-5 w-5 before:inset-0.5 xs:h-5 xs:w-5",
    value && colorMap[value]
  );

  if (isExport) {
    return (
      <div
        className={twMerge(
          "inline-block",
          sharedStyles,
          // Since a div can't be "checked", we determine the checked state with JS
          isChecked && "border-black/40 before:opacity-100",
          className
        )}
      />
    );
  }

  return (
    <input
      type="radio"
      ref={ref}
      aria-label={labelMap.get(value)}
      title={labelMap.get(value)}
      onClick={() => {
        // If the radio input is clicked while checked, we uncheck it
        // This goes against standard browser behavior, but I think it's the
        // most elegant way to remove the answer from an individual question
        if (isChecked && name && formContext) {
          formContext.setValue(name, null);
        }
      }}
      name={name}
      value={value}
      {...restProps}
      className={twMerge(sharedStyles, className)}
    />
  );
});

Radio.displayName = "Radio";
