import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Radio } from "./radio";

interface LegendProps {
  className?: string;
}

export const Legend = forwardRef<HTMLElement, LegendProps>(
  ({ className }, ref) => {
    return (
      <aside
        ref={ref}
        className={twMerge(
          "z-10 flex flex-wrap justify-center gap-4 rounded-b-3xl bg-white p-4 shadow-lg shadow-rose-100",
          className
        )}
      >
        <label className="flex items-center gap-2 text-lg font-medium text-gray-600">
          <Radio value="7" checked readOnly />
          Favorite
        </label>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-600">
          <Radio value="6" checked readOnly />
          Love
        </label>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-600">
          <Radio value="5" checked readOnly />
          Like
        </label>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-600">
          <Radio value="4" checked readOnly />
          Curious
        </label>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-600">
          <Radio value="3" checked readOnly />
          Meh
        </label>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-600">
          <Radio value="2" checked readOnly />
          Maybe
        </label>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-600">
          <Radio value="1" checked readOnly />
          Limit
        </label>
      </aside>
    );
  }
);
Legend.displayName = "Legend";
