/**
 * Iterate through an object in a depth-first manner, mapping each leaf value
 * using a given function.
 */
export function deepMapValues(obj: object, fn: (value: any) => any): any {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      Object.keys(obj[key]).length > 0
    ) {
      result[key] = deepMapValues(obj[key], fn);
    } else {
      result[key] = fn(obj[key]);
    }
  }
  return result;
}

/**
 * Encodes form values in a way that can be stored in the URL search params
 */
export function encodeValues(values: any): string {
  const flatValues = Object.keys(values)
    .map((sectionName) =>
      Object.keys(values[sectionName]).map((questionName) =>
        Object.keys(values[sectionName][questionName]).map(
          (subquestionName) =>
            values[sectionName][questionName][subquestionName]
        )
      )
    )
    .flat(2);
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
  let i = 0;
  return deepMapValues(shape, () => flatValues[i++]);
}
