"use client";
import { decodeValues } from "@kinkli/utils";
import { useSearchParams } from "next/navigation";
import { getEmptyValues } from "./default-values";
import { TKinks } from "./schema";

export function useAnswers(kinks: TKinks) {
  const searchParams = useSearchParams();
  const emptyValues = getEmptyValues(kinks);

  const encodedValues = searchParams.get("answers");
  if (encodedValues) {
    const shape = emptyValues;
    return decodeValues(encodedValues, shape);
  } else {
    return emptyValues;
  }
}
