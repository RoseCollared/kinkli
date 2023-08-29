"use client";

import { useIsExport } from "@kinklist/context/export-context";
import { forwardRef, type InputHTMLAttributes } from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { labelMap } from "./legend";

const colorMap = {
  "0": "bg-white", // ⬜️
  "1": "bg-red-100 before:bg-red-500", // 🟥
  "2": "bg-orange-100 before:bg-orange-400", // 🟧
  "3": "bg-yellow-100 before:bg-yellow-500", // 🟨
  "4": "bg-green-100 before:bg-green-400", // 🟩
  "5": "bg-sky-100 before:bg-sky-400", // 🟦
  "6": "bg-violet-100 before:bg-violet-500", // 🟪
  "7": "bg-pink-100 before:bg-pink-400", // 🩷
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
    "relative h-7 w-7 appearance-none rounded-full border-2 border-black/20 transition-colors before:absolute before:inset-1 before:rounded-full before:opacity-0 before:transition-opacity checked:border-black/40 checked:before:opacity-100 hover:before:opacity-70 checked:hover:before:opacity-100 xs:h-8 xs:w-8 lg:h-5 lg:w-5 lg:before:inset-0.5",
    alwaysSmall && "h-5 w-5 before:inset-0.5 xs:h-5 xs:w-5",
    value && colorMap[value as string]
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
      aria-label={labelMap[value]}
      title={labelMap[value]}
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
