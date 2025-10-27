import React, { useState, createContext } from "react";
import Button from "./components/Button";
import {ButtonContextType} from "./ButtonInterface.tsx";

// createContext should return an OBJECT with the properties we want children components to have access to
export const ButtonContext = createContext<ButtonContextType>({
  increment: () => {},
  decrement: () => {},
});

export default function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  // Context Provider does NOT need to be wrapped in <> </>
  return (
    <ButtonContext.Provider value={{ increment, decrement }}>
      <div>
        <h1>{count}</h1>
        <Button />
      </div>
    </ButtonContext.Provider>
  );
}
