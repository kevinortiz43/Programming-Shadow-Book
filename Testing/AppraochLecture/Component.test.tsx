import MyComponent from "./Components";
import { it, expect, describe,beforeAll,beforeEach,afterAll,afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/vitest";

const props = {
  name: "Neville",
  age: 4,
  isEnginner: false,
};

afterEach(()=>{
  cleanup()
})

it("renders the text on the DOM", () => {
  render(<MyComponent {...props} />);
  //   screen.debug();
  //   expect(1).toBe(1);
  expect(screen.getByText("Neille")).tobeInTheDocument();
});

it("renders multiple times", () => {
  render(<MyComponent {...props} />);
  render(<MyComponent {...props} />);
  render(<MyComponent {...props} />);

  const listItem = screen.getAllByRole("listitem");

  // dom persists between the tests. it rendered an extra component on line 14
  expect(listItem).toHaveLength(3);
});
