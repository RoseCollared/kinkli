import { Radio } from "./radio";

export function Legend() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
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
    </div>
  );
}
