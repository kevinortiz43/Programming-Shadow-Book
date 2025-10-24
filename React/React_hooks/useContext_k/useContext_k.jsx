// use Context
// useContext
// useContext is a React Hook that lets you read and subscribe to context from your component.

import { createContext, useState } from "react";
// 9 import theme provider
import { ThemeProvider } from "./ThemeContext";

// step 1 we create a Theme context with the create context hook and export it
// so we can use it in other parts of the application
export const ThemeContext = React.createContext();

// step 2 context has 2 parts a context provider which wraps the code that needs the information in the context

import React from "react";
import FunctionContextComponent_k from "./functionContextComponent_k";
import ClassContextComponent_k from "./classContextComponent_k";

export default function useContext_k() {
  const [darkTheme, setDarkTheme] = useState(true);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }
  return (
    <>
      {/* step 3 this will pass the props to anywhere down in the children */}
      {/* Step 4 the props are available to all the children  like a global state for all the children in the provider*/}
      <ThemeContext.Provider value={dark}>
        <button onClick={toggleTheme}> toggle theme</button>
        <FunctionContextComponent_k></FunctionContextComponent_k>
        <ClassContextComponent_k></ClassContextComponent_k>
      </ThemeContext.Provider>

      {/* step 10 we can just use the theme provider  which is found in our theme context.jsx*/}
      {/* step 11 we need to add a toggle theme context in our theem provideer */}

    {/* // step 13 */}
      <ThemeProvider>
        <FunctionContextComponent_k></FunctionContextComponent_k>
      </ThemeProvider>
    </>

  );
}

/**
 * overview 
 * inside of our app we have a theme provider that is wrapping all the logic that is handling the state and updating the state to the children (function context componenet)
 * 
 * inside of our theme we have the theem provider that is handling updating and creating the state
 * and persisting boh the values down to our children
 * then we have custom hooks the use theme and use theme update 
 * gives us easy access to the values
 * 
 * 
 */