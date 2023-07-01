import kinks from "../public/kinks.json";
import { dataSchema } from "./schema";

test("data conforms to schema", () => {
  expect(() => dataSchema.parse(kinks)).not.toThrow();
});
