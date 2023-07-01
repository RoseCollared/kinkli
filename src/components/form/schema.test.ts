import kinks from "../public/kinks.json";
import { questionDataSchema } from "./schema";

test("data conforms to schema", () => {
  expect(() => questionDataSchema.parse(kinks)).not.toThrow();
});
