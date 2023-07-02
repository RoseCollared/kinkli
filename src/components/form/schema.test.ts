import kinks from "../../../public/kinks.json";
import { kinksSchema } from "./schema";

test("data conforms to schema", () => {
  expect(() => kinksSchema.parse(kinks)).not.toThrow();
});
