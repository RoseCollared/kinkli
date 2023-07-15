"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const colorMap = {
  "1": "bg-red-100 before:bg-red-500", // 🟥
  "2": "bg-orange-100 before:bg-orange-400", // 🟧
  "3": "bg-yellow-100 before:bg-yellow-500", // 🟨
  "4": "bg-green-100 before:bg-green-400", // 🟩
  "5": "bg-sky-100 before:bg-sky-400", // 🟦
  "6": "bg-violet-100 before:bg-violet-500", // 🟪
  "7": "bg-pink-100 before:bg-pink-400", // 🩷
};

export const Radio = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  // This will be undefined when not used in a <FormProvider>
  const formContext = useFormContext() as UseFormReturn | undefined;

  const valueOfCheckedInput =
    formContext && props.name ? formContext.watch(props.name) : undefined;
  const isChecked =
    props.value !== undefined && props.value === valueOfCheckedInput;

  return (
    <input
      type="radio"
      ref={ref}
      onClick={() => {
        // If the radio input is clicked while checked, we uncheck it
        // This goes against standard browser behavior, but I think it's the
        // most elegant way to remove the answer from an individual question
        if (isChecked && props.name && formContext) {
          formContext.setValue(props.name, null);
        }
      }}
      {...props}
      className={twMerge(
        "relative h-8 w-8 appearance-none rounded-full border-2 border-black/20 transition-colors before:absolute before:inset-1 before:rounded-full before:opacity-0 before:transition-opacity checked:border-black/40 checked:before:opacity-100 hover:before:opacity-70 checked:hover:before:opacity-100 lg:h-5 lg:w-5 lg:before:inset-0.5",
        props.value && colorMap[props.value as string],
        props.className
      )}
    />
  );
});

Radio.displayName = "Radio";
