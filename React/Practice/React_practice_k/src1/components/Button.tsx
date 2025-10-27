import React, { useContext } from 'react';
import { ButtonContext } from "../App";

export default function Button() {
  const { increment, decrement } = useContext(ButtonContext);

  return (
    <div>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
}