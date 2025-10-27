import React from "react";

export default function Button({  addClick, subtractClick }:{ addClick: () => void,  subtractClick: () => void }) {

  return (
    <div>
      <button onClick={subtractClick}>-</button> 
      <button onClick={addClick}>+</button>
    </div>
  );
}
