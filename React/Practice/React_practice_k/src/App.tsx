import React from "react";
import { useState, useEffect } from "react";
import Button from "./components/Button";

export default function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  
  const decrement = () => {
    setCount((prev) => prev - 1);
  };


  return (
    <div>
      <h1> {count} </h1>
      <Button
        addClick={increment}
        // addClick={() => increment()} // this ALSO works
        // subtractClick={()=>decrement()}0
        subtractClick={decrement}    // addOrSubtract = {increase}
      />
    </div>
  );
}
