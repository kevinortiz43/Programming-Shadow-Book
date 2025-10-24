// https://www.youtube.com/watch?v=t2ypzz6gJm0&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=4

import { useRef, useState, useEffect } from "react";
import React from "react";

// INCORRECT WAY to render count (the below would cause infinite loop since useState would make this re-render every time something changes)
// export default function App() {
//   const [name, setName] = useState("");
//   const [renderCount, setRenderCount] = useState(0)

//   useEffect( () => {
//     setRenderCount(prevRenderCount => prevRenderCount + 1)
//   });

//   return (
    <>
    {
    /* input form so user will type something 
    onChange works when user input / text HTML els, invokes the setName setter function
    causing React to re-render (due to being in useState hook), changing {name} to whatever user types in*/}
      {/* <input value={name} onChange={(e) => setName(e.target.value)} />
      <div>My name is {name}</div>
      <div>I rendered {renderCount} times</div> */}
    </>
//   );
// }

// onRef EXAMPLE with useEffect()
export default function App() {
    const [name, setName] =useState('');
    const renderCount = useRef(1);
    // useRef(initial value) -> returns an object with a current property with single value
    // { current: 1 }
    // useRef is very similiar to useState but will NOT re-render 

    useEffect( () => {
        renderCount.current = renderCount.current + 1;
    })    

 return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <div>My name is {name}</div>
      <div>I rendered {renderCount.current} times</div>
    </>
  );
}



// useRef() with focus button
// onRef EXAMPLE with useEffect()
export default function App1() {
    const [name, setName] =useState('');
    const inputRef = useRef();

    function focus() {
        inputRef.current.focus();
        // the below 2 lines are NOT recommended (BAD), just use the line above
        // inputRef.current.value = 'Some value'
        // appendChild
    }

  return (
    <>
    {/* each HTML el has a ref property on it  */}
      <input ref={inputRef} value={name} onChange={(e) => setName(e.target.value)} />
      <div>My name is {name}</div>
      <button onClick={focus}>Focus</button>
    </>
  );
}

// useRef to store PREVIOUS value of state
export default function App2() {
    const [name, setName] =useState('');
    const prevName = useRef('');

    useEffect( () => {
        prevName.current = name
    }, [name]);
    // this has name in dependency array since depends on when name changes

  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <div>My name is {name} and it used to be {prevName.current}</div>
    </>
  );
}
