"use client";

import { labelMap } from "@kinkli/answer-labels";
import { useIsExport } from "@kinkli/context/export-context";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";
import { Radio } from "./radio";

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
  const isExport = useIsExport();

  return (
    <aside
      ref={ref}
      className={twMerge(
        // Fine-tune max width to balance rows
        "z-10 box-content flex max-w-sm flex-wrap justify-center gap-x-4 gap-y-1 rounded-b-3xl bg-transparent px-8 py-4 transition-colors sm:sticky sm:top-0 sm:border-2 sm:border-t-0 sm:border-transparent md:max-w-none",
        showNA && "md:max-w-sm lg:max-w-none",
        isSticking &&
          !isExport &&
          "sm:border-rose-300 sm:bg-white sm:shadow-lg dark:sm:border-red-700 dark:sm:bg-zinc-700",
        className
      )}
    >
      {Array.from(labelMap.keys())
        .filter((key) => key !== "0" || showNA) // hide N/A by default
        .map((key) => (
          <label
            key={key}
            className="flex items-center gap-2 text-lg font-medium text-gray-600 dark:text-gray-100"
          >
            <Radio
              value={key}
              checked={key !== "0"} // everything checked except N/A
              readOnly
              alwaysSmall
              title={undefined} // no need since the label is displayed alongside
            />
            {labelMap.get(key)}
          </label>
        ))}
    </aside>
  );
}
