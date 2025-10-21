// https://www.youtube.com/watch?v=O6P86uwfdR0&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=1

import React, { useState } from "react";

function App() {
    //1st current state, 2nd setter function that updates state
    const [count, setCount ] =useState(4); 
    // default state of 4
    // 4 would be hard-coded in, okay if just this simple value. But if it were fibonacci passed in as a function, the could be problematic
// this would run only once since jsut has primitive value passed in

 function decrementCount() {
        // make sure to pass in as anonymous function (function version of setting state)
        // NOT simply setCount(count - 1) 
        setCount(prevCount => prevCount-1)
    }

    function incrementCount() {
        setCount(prevCount => prevCount+1)
    }

  return (
    // this is just an empty parent element
    <>
      <button onCLick={decrementCount}>-</button>
      <span>0</span>
      <button onCLick={incrementCount}>+</button>
    </>
  );
}



// he's showing if you pass in a function into useState as 1st argument
function countInitial() {
    console.log('run function')
    return 4;
}

function App1() {
    const [count, setCount ] =useState( () => {
        console.log('run function');
        return 4;
    }); 
    // the above will only run once, when the component is first rendered

//    const [count, setCount ] =useState(countInitial()); 
// but if we put the function as an invoked function inside of useState, it will cause that invoked function to run EVERY TIME the component re-renders 
// NOT good for fibaonnci series or complex calculations

    // const [count, setCount ] =useState( () => countInitial() ); 
    // the above will also only run once, when the component is first rendered



// example where 1st parameter is a destructured object
function App2() {
    //1st current state, 2nd setter function that updates state
    const [state, setState ] =useState({count: 4, theme: 'blue'}); 
    const count = state.count;
    const theme = state.theme;

   function decrementCount() {
        setState(prevState => {
    // if you do not have ...prevState, you'll only get 3 and 'blue' will be overwritten
    // so make sure you also pass in ALL the variables from the initial state
    // so you need to add ...prevState before the count change like this:
          return {...prevState, count: prevState.count - 1} 
    }) 
   }

    function incrementCount() {
        // setCount(prevCount => prevCount+1)
    }


  return (
    // this is just an empty parent element
    <>
      <button onCLick={decrementCount}>-</button>
      <span>count</span>
      <span>theme</span>
      <button onCLick={incrementCount}>-</button>
    </>
  );
}



// example showing how you should have different hooks for each changed-state property
function App2() {
    //1st current state, 2nd setter function that updates state
    const [count, setCount ] =useState(4);
    const [theme, setTheme ] =useState('blue');

   function decrementCount() {
        setCount(prevCount => prevCount-1) 
   }

    function incrementCount() {
        setCount(prevCount => prevCount+1);
        setTheme( prevTheme => prevTheme = 'red'); // instead of setTheme('red')
    }


  return (
    // this is just an empty parent element
    <>
      <button onCLick={decrementCount}>-</button>
      <span>count</span>
      <span>theme</span>
      <button onCLick={incrementCount}>-</button>
    </>
  );
}


   

export default App;