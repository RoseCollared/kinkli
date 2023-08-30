"use client";

import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";
import { Radio } from "./radio";

/** Maps input values to labels */
export const labelMap = {
  "7": "Favorite",
  "6": "Love",
  "5": "Like",
  "4": "Curious",
  "3": "Meh",
  "2": "Maybe",
  "1": "Limit",
  "0": "N/A",
};

interface LegendProps {
  /** Whether to show an input for the "N/A" value */
  showNA?: boolean;
  className?: string;
}

export function Legend({ showNA, className }: LegendProps) {
  const { ref, inView } = useInView({
    threshold: 1,
    // Trigger when the element is within 1 px from the top/bottom edge of the screen, but don't trigger when touching the sides
    rootMargin: "-1px 0px",
    initialInView: true,
  });
  const isSticking = !inView;

  return (
    <aside
      ref={ref}
      className={twMerge(
        // Fine-tune max width to balance rows
        "z-10 box-content flex max-w-sm flex-wrap justify-center gap-x-4 gap-y-1 rounded-b-3xl bg-transparent px-8 py-4 transition-all sm:sticky sm:top-0 md:max-w-none",
        showNA && "md:max-w-sm lg:max-w-none",
        isSticking &&
          "sm:border-2 sm:border-t-0 sm:border-rose-300 sm:bg-white sm:shadow-lg",
        className
      )}
    >
      {Object.entries(labelMap)
        .filter(([value]) => value !== "0" || showNA) // hide N/A by default
        .map(([value, label]) => (
          <label
            key={value}
            className="flex items-center gap-2 text-lg font-medium text-gray-600"
          >
            <Radio
              value={value}
              checked
              readOnly
              alwaysSmall
              title={undefined} // no need since the label is displayed alongside
            />
            {label}
          </label>
        ))}
    </aside>
  );
}
