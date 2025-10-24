// useMemo
// useMemo is a React Hook that lets you cache the result of a calculation between re-renders.

// purprose of code it will make a slow function call

// step 1, we can use the use memo hook and import it.
import React, { useState, useMemo, useEffect, useEffectEvent } from "react";

export default function useMemo_K() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  // step 2 use memo is added here as an anonymous function to cache the results
  // step 4, if the number is the same as last time there's no need to recall the slow function
  // step5 don't use memo on everything, it increases memoery and rerenders everytime.
  // step 6 another use case is referential equality. comparing value vs reference
  const doubleNumber = useMemo(() => {
    return slowFunction(number);
    // step 3 we have to add a list of depencies, in this case it will be number
  }, [number]);

  // step 6 another use case is referential equality. comparing value vs reference

  //step 9 use memo to make sure useeffect changes only when themestyle valuesis actually updated
  // step 10 now our themsetyle will only get rerendered if any of the values inside change no need to constantly call
  // we are wrapping the object in useMemoization. if our dark doesn't change no need to rerender. we get the exact same reference as previous.
  // themsetyles reference the same obj
  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? "black" : "white",
      color: dark ? "white" : "black",
    };
  }, [dark]);

  // step 6 another use case is referential equality. comparing value vs reference
  //   even tho we have two object and the ylook alike they are saved in memory at different places
  const themeStyles2 = {
    backgroundColor: dark ? "black" : "white",
    color: dark ? "white" : "black",
  };

  // step 7 useEffect, when this program rerenders it will create themestyles multiple times
  // even tho the object is different in memory.
  //step 8 use memo to make sure useeffect changes only when themestyle valuesis actually updated

  useEffect(() => {
    console.log("theme changed");
  }, [themeStyles]);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.validationMessage))}
      />
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        change themse
      </button>
      <div style={themeStyles}>{doubleNumber}</div>
    </div>
  );
}

function slowFunction(num) {
  console.log("Calling slow fucntion");
  for (let i = 0; i < 10000000000; i++) {}
  return num * 2;
}
