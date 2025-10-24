// https://youtu.be/5LrDIWkK_Bc?si=2CWbSmM1r5ULPfjR

import React, { useState } from "react";
import FunctionContextComponent from "./FunctionContextComponent";
import ClassContextComponent from "./ClassContextComponent";

// export const ThemeContext = React.createContext();
// we might not need React.createContext but just have createContext()
export const ThemeContext = createContext();

export default function App() {
  // useState using boolean
  const [darkTheme, setDarkTheme] = useState(true);

  // toggles back and forth between dark theme and not dark theme
  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }

  return (
    <>
      <ThemeContext.Provider value={darkTheme}>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <FunctionContextComponent />
        <ClassContextComponent />
      </ThemeContext.Provider>
    </>
  );
}
//use Provider to wrap everything inside
// 2 different component contexts: FunctionContextComponent & ClassContextComponent
// Context 2 different sections: ThemeContext.Provider & value={darkTheme}
// everything inside < .Provider> (including FunctionContextComponent / ClassContextComponent's children, grandchildren, great-grandchildren, etc.) has access to the value (i.e. dark theme)
// useContext can be used to pass props down without having to do it manually!

// Inside PARENT container like App.jsx
// step 1: import ContextComponents, libraries
// step 2: Assign ContextVariable = createContext()
// step 3: do whatever's needed with useState
// step 4: in RETURN statement, ContextVariable.Provider value={ } key={ } WHATEVER ATTRIBUTES YOU WANT TO BE AVAILABLE TO ContextComponents' CHILDREN, grandchildren, etc. 
// step 5: in RETURN statement, also add ContextComponents HERE

//Inside ContextComponent indiv files
// step 6: import { ContextVariable } from App, import { useContext } from react
// step 7: const anotherVariable  = useContext( ContextVariable ) so the value or WHATEVER ATTRIBUTES you had inside Provider are available here!! including the button / {toggleTheme} 
