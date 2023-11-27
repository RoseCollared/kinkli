import { getEmptyValues } from "@kinkli/components/form/default-values";
import { Form } from "@kinkli/components/form/form";
import { kinksSchema } from "@kinkli/components/form/schema";
import { TableOfContents } from "@kinkli/components/table-of-contents";
import { useMemo } from "react";
import kinksData from "../../../public/kinks.json";

export default function HomePage() {
  const parsedKinks = useMemo(() => kinksSchema.parse(kinksData), []);
  const emptyValues = useMemo(() => getEmptyValues(parsedKinks), [parsedKinks]);

  return (
    <>
      <TableOfContents kinks={parsedKinks} className="mt-4 sm:hidden" />
      <Form kinks={parsedKinks} emptyValues={emptyValues} />
    </>
  );
}
