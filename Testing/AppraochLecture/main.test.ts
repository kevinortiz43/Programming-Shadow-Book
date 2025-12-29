import { add, divide, twice } from "./main.ts";
import { expect, it, describe, vi } from "vitest";

describe("mathFunctions()", () => {
  describe("add()", () => {
    it("add two numbers toogether", () => {
      const result = add(4, 5);
      expect(result).toBe(9);
      //   expect(result).toBeFalsy();
    });

    it("works with negative numbers", () => {
      const result = add(-8, -8);
      expect(result).toBe(-16);
    });
  });

  it("divides two numbers", () => {
    const result = divide(10, 2);
    expect(result).toBe(5);
    expect(divide(0, 2)).toBe(0);
    expect(divide(8, 0)).toBeUndefined;
  });
});

describe("twice()", () => {
  it("calls the b function twice", () => {
    const mockFunc = vi.fn();

    twice(mockFunc);
    expect(mockFunc).toBeCalledTimes(2);
  });
});

// arrange  -> act -> asset

//how to run
// npx vitest main.test.ts
// npx vitest
