import kinks from "../public/kinks.json";
import { kinksSchema } from "./components/form/schema";

const shortKinks = {
  ...kinks,
  sections: kinks.sections.slice(0, 3)
}

export function getKinks() {
  if (process.env.NEXT_ENV === "test") {
    return kinksSchema.parse(shortKinks);
  } else {
    return kinksSchema.parse(kinks);
  }
}
