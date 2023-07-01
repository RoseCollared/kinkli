import { decodeValues, encodeValues, deepMapValues } from "./utils";

describe("deepMapValues()", () => {
  test("maps deeply nested values", () => {
    const obj = {
      a: 1,
      b: {
        c: {
          d: 2,
        },
      },
    };
    const result = deepMapValues(obj, (v) => v * 2);
    expect(result).toStrictEqual({
      a: 2,
      b: {
        c: {
          d: 4,
        },
      },
    });
  });

  test("traverses in the right order", () => {
    const shape = {
      a: null,
      b: {
        c: null,
      },
      d: null,
    };
    const values = [0, 1, 2];
    let i = 0;
    const result = deepMapValues(shape, () => values[i++]);
    expect(result).toStrictEqual({
      a: 0,
      b: {
        c: 1,
      },
      d: 2,
    });
  });
});

describe("encode/decodeValues", () => {
  test("encode/decode are each other's inverse", () => {
    const rawValues = {
      s1: {
        q1: {
          sq1: "1",
          sq2: null,
        },
        q2: {
          sq1: "7",
          sq2: "7",
        },
        q3: {
          sq1: null,
          sq2: "1",
        },
      },
    };
    const encodedValues = encodeValues(rawValues);
    const decodedValues = decodeValues(encodedValues, rawValues);
    expect(decodedValues).toEqual(rawValues);
  });

  test("encodes null as 0", () => {
    const rawValues = {
      foo: {
        bar: {
          baz: null,
          cux: "1",
        },
      },
    };
    expect(encodeValues(rawValues)).toBe("01");
  });

  test("decodes 0 as null", () => {
    const shape = {
      foo: {
        bar: {
          baz: "anything",
          cux: "anything",
        },
      },
    };
    expect(decodeValues("01", shape)).toEqual({
      foo: {
        bar: {
          baz: null,
          cux: "1",
        },
      },
    });
  });
});
