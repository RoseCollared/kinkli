import { getEmptyValues } from "@kinkli/components/form/default-values";
import { Form } from "@kinkli/components/form/form";
import { kinksSchema } from "@kinkli/components/form/schema";
import { useMemo } from "react";
import kinksData from "../../../public/kinks.json";

export default function HomePage() {
  const parsedKinks = useMemo(() => kinksSchema.parse(kinksData), []);
  const emptyValues = useMemo(() => getEmptyValues(parsedKinks), [parsedKinks]);

  return <Form kinks={parsedKinks} emptyValues={emptyValues} />;
}
