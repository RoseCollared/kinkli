import type { DeepPartial } from "react-hook-form";

/**
 * Remove all characters that have special meaning in react-hook-form field names
 */
export function sanitizeInputName(str: string) {
  return str.replaceAll(/[\s\-\,\.\[\]/]/g, "");
}

/**
 * Iterate through an object in a depth-first manner, assigning values to the leaves.
 */
export function fillObject(shape: object, values: any[]): any {
  let i = 0;
  function fillObjectInner(shape: object): any {
    const result = {};
    for (const key of Object.keys(shape)) {
      if (
        typeof shape[key] === "object" &&
        shape[key] !== null &&
        Object.keys(shape[key]).length > 0
      ) {
        result[key] = fillObjectInner(shape[key]);
      } else {
        if (i >= values.length) {
          throw new Error("Not enough values to fill object");
        }
        result[key] = values[i++];
      }
    }
    return result;
  }
  return fillObjectInner(shape);
}

/**
 * Encodes form values in a way that can be stored in the URL search params
 */
export function encodeValues(
  values: DeepPartial<Record<string, Record<string, any>>>
): string {
  // Transform all form values to a flat array
  const flatValues = Object.values(values || {}).flatMap((questions) =>
    Object.values(questions || {})
  );
  const stringValues = flatValues.map((value) =>
    value === null ? "0" : value
  );
  return stringValues.join("");
}

/**
 * Inverse of `encodeValues`
 */
export function decodeValues(
  values: string,
  shape: Record<string, Record<string, any>>
) {
  const stringValues = Array.from(values);
  const flatValues = stringValues.map((value) =>
    value === "0" ? null : value
  );
  return fillObject(shape, flatValues);
}
