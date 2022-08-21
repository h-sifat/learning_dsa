import FixedArray from "./fixed-array";

describe("Constructor", () => {
  it("creates an array with the given length", () => {
    const length = 3;
    const array = new FixedArray(length);

    expect(array).toHaveLength(length);
  });

  it.each([2.2, -1])(`throws error if length (%p) is invalid`, (length) => {
    expect(() => {
      new FixedArray(length);
    }).toThrow(Error);
  });
});

describe("index validation", () => {
  describe("insertAt", () => {
    it.each([
      {
        method: "insertAt",
        array: new FixedArray(0),
        args: [1.32, 2],
        case: "non integer index",
      },
      {
        method: "insertAt",
        array: new FixedArray(0),
        args: [1, 2],
        case: "index out of bounds",
      },
      {
        method: "insertAt",
        array: new FixedArray(2),
        args: [-1, 2],
        case: "negative index",
      },
      {
        method: "insertAt",
        array: new FixedArray(2),
        args: [2, 2],
        case: "index out of bounds",
      },
    ] as const)(`throws error for: "$case"`, ({ method, array, args }) => {
      expect(() => {
        array[method](...(args as [number, number]));
      }).toThrow(/index/i);
    });
  });

  describe("at", () => {
    it.each([
      {
        method: "at",
        array: new FixedArray(0),
        arg: 1.32,
        case: "non integer index",
      },
      {
        method: "at",
        array: new FixedArray(0),
        arg: 1,
        case: "index out of bounds",
      },
      {
        method: "at",
        array: new FixedArray(2),
        arg: -1,
        case: "negative index",
      },
      {
        method: "at",
        array: new FixedArray(2),
        arg: 2,
        case: "index out of bounds",
      },
    ] as const)(`throws error for: "$case"`, ({ method, array, arg }) => {
      expect(() => {
        array[method](arg);
      }).toThrow(/index/i);
    });
  });
});

describe("indexOf", () => {
  const array = new FixedArray<number>(3);
  array.insertAt(0, 1);
  array.insertAt(1, 2);
  array.insertAt(2, 2);

  it("returns the current index of items", () => {
    expect(array.indexOf(1)).toBe(0);
    expect(array.indexOf(2)).toBe(1);
  });

  it("returns -1 as the index if the searching element cannot be found", () => {
    expect(array.indexOf(5)).toBe(-1);
  });
});

describe("lastIndexOf", () => {
  const array = new FixedArray<number>(3);
  array.insertAt(0, 1).insertAt(1, 2).insertAt(2, 2);

  it("returns the current index of items", () => {
    expect(array.lastIndexOf(1)).toBe(0);
    expect(array.lastIndexOf(2)).toBe(2);
  });

  it("returns -1 as the index if the searching element cannot be found", () => {
    expect(array.lastIndexOf(5)).toBe(-1);
  });
});

describe("find", () => {
  const array = new FixedArray<string>(2);
  array.insertAt(0, "a");
  array.insertAt(1, "b");

  it("returns the first matching element", () => {
    const result = array.find((e) => e > "a");
    expect(result).toBe("b");
  });
});
