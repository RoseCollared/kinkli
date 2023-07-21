"use client";

import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";
import { Radio } from "./radio";

interface LegendProps {
  className?: string;
}

export function Legend({ className }: LegendProps) {
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
        "z-10 box-content flex max-w-[260px] flex-wrap justify-center gap-x-4 gap-y-1 rounded-b-3xl bg-transparent px-8 py-4 transition-all sm:sticky sm:top-0 sm:max-w-md md:max-w-none",
        isSticking &&
          "sm:border-2 sm:border-t-0 sm:border-rose-300 sm:bg-white sm:shadow-lg",
        className
      )}
    >
      <label className="flex items-center gap-2 text-lg font-medium text-gray-600">
        <Radio value="7" checked readOnly alwaysSmall />
        Favorite
      </label>
      <label className="flex items-center gap-2 text-lg font-medium text-gray-600">
        <Radio value="6" checked readOnly alwaysSmall />
        Love
      </label>
      <label className="flex items-center gap-2 text-lg font-medium text-gray-600">
        <Radio value="5" checked readOnly alwaysSmall />
        Like
      </label>
      <label className="flex items-center gap-2 text-lg font-medium text-gray-600">
        <Radio value="4" checked readOnly alwaysSmall />
        Curious
      </label>
      <label className="flex items-center gap-2 text-lg font-medium text-gray-600">
        <Radio value="3" checked readOnly alwaysSmall />
        Meh
      </label>
      <label className="flex items-center gap-2 text-lg font-medium text-gray-600">
        <Radio value="2" checked readOnly alwaysSmall />
        Maybe
      </label>
      <label className="flex items-center gap-2 text-lg font-medium text-gray-600">
        <Radio value="1" checked readOnly alwaysSmall />
        Limit
      </label>
    </aside>
  );
}
