import { encodeValues } from "@kinklist/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Control, useWatch } from "react-hook-form";
import { FormValues } from "./schema";

/**
 * Saves answers in search params when form state changes
 */
export function useSaveAnswers(
  control: Control<FormValues>,
  emptyDefaultValues: FormValues
) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const values = useWatch<FormValues>({ control });

  useEffect(() => {
    if (Object.keys(values).length === 0) {
      // Values haven't been loaded yet, don't do anything
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (encodeValues(values) !== encodeValues(emptyDefaultValues)) {
      params.set("answers", encodeValues(values));
    } else {
      params.delete("answers");
    }

    // HACK: use history API because Next.js router.replace() always scrolls to top
    // See: https://github.com/vercel/next.js/issues/50105#issuecomment-1585699851
    history.replaceState(
      null,
      "",
      pathname + (params.toString() ? "?" + params.toString() : "")
    );
  }, [emptyDefaultValues, pathname, searchParams, values]);
}
