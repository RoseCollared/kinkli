import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";
import { Radio } from "./radio";

interface LegendProps {
  className?: string;
}

export function Legend({ className }: LegendProps) {
  const { ref, inView } = useInView({
    threshold: 1,
    rootMargin: "-1px 0px", // to trigger when the element is within 1 px from the edge of the screen
    initialInView: true,
  });
  const isSticky = !inView;

  return (
    <aside
      ref={ref}
      className={twMerge(
        "z-10 flex flex-wrap justify-center gap-4 rounded-b-3xl bg-transparent px-8 py-4 transition-all",
        isSticky && "border-2 border-t-0 border-rose-300 bg-white shadow-lg",
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
