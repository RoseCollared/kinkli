"use client";

import { encodeValues } from "@kinkli/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { DeepPartial } from "react-hook-form";
import { getEmptyValues } from "./default-values";
import { FormValues, TKinks, formValuesSchema } from "./schema";

/**
 * Saves answers in search params when form state changes
 */
export function useSaveAnswers(
  answers: DeepPartial<FormValues>,
  kinks: TKinks
) {
  const emptyValues = getEmptyValues(kinks);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // LEFT HERE
    // FIXME: this doesn't work because `answers` actually has string values, not numbers
    // so the type is wrong and validation fails here
    const result = formValuesSchema.safeParse(answers);
    console.log({ result })

    if (!result.success) {
      // Answers haven't been loaded yet, don't do anything
      return;
    }

    const parsedAnswers = result.data;

    const params = new URLSearchParams(searchParams.toString());
    if (encodeValues(parsedAnswers) !== encodeValues(emptyValues)) {
      params.set("answers", encodeValues(parsedAnswers));
    } else {
      params.delete("answers");
    }

    const paramstring = params.toString();
    router.replace(pathname + (paramstring ? "?" + paramstring : ""), {
      scroll: false,
    });
  }, [emptyValues, pathname, searchParams, answers, router]);
}
