import { getEmptyValues } from "@kinkli/components/form/default-values";
import { kinksSchema } from "@kinkli/components/form/schema";
import { Results } from "@kinkli/components/results/results";
import { TableOfContents } from "@kinkli/components/table-of-contents";
import { useMemo } from "react";
import kinksData from "../../../public/kinks.json";

export default function ResultsPage() {
  const parsedKinks = useMemo(() => kinksSchema.parse(kinksData), []);
  const emptyValues = useMemo(() => getEmptyValues(parsedKinks), [parsedKinks]);

  return (
    <>
      <TableOfContents kinks={parsedKinks} className="mt-4 sm:hidden" />
      <Results kinks={parsedKinks} emptyValues={emptyValues} />
    </>
  );
}
