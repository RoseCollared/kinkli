import { decodeValues, encodeValues, fillObject } from "./utils";

describe("fillObject()", () => {
  test("returns an object with the correct shape values", () => {
    const shape = {
      x: null,
      y: {
        z: null,
      },
    };
    const values = [0, 1];
    const result = fillObject(shape, values);
    expect(result.x).toBe(0);
    expect(result.y.z).toBe(1);
  });

  test("throws when not enough values are given", () => {
    const shape = {
      x: null,
      y: {
        z: null,
      },
    };
    const values = [0];

    expect(() => {
      fillObject(shape, values);
    }).toThrowError();
  });
});

describe("encode/decodeValues", () => {
  test("encode and decode values correctly", () => {
    const rawValues = {
      foo: {
        bar: null,
        baz: "1",
      },
    };
    const encodedValues = encodeValues(rawValues);
    const decodedValues = decodeValues(encodedValues, rawValues);
    expect(decodedValues).toEqual(rawValues);
  });

  test("encodes null as 0", () => {
    const rawValues = {
      foo: {
        bar: null,
        baz: "1",
      },
    };
    expect(encodeValues(rawValues)).toBe("01");
  });

  test("decodes 0 as null", () => {
    const shape = {
      foo: {
        bar: "anything",
        baz: "anything",
      },
    };
    expect(decodeValues("01", shape)).toEqual({
      foo: {
        bar: null,
        baz: "1",
      },
    });
  });
});
