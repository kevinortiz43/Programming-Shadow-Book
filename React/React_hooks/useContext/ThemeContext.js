
import React, { useContext, useState } from 'react'

const ThemeContext = createContext();
// need to create ANOTHER context for UPDATING context, changing state!!
const ThemeUpdateContext = createContext();

// use custom HOOKS (CLOSURE) to return ThemeContext & ThemeUpdateContext so we can access it outside of this file
export function useTheme() {
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
}

// replaces return statement code from original App.jsx
// takes in children so can wrap around anything
  export function ThemeProvider( { children }) {

  // useState using boolean
    const [darkTheme, setDarkTheme] = useState(true);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }

   return ( // doesn't seem like any wrapping inside HTML element here
    // set value to initial state darkTheme
        <ThemeContext.Provider value={darkTheme}>
            {/* put function that UPDATES context here (button toggle) */}
            <ThemeUpdateContext.Provider value={toggleTheme}>
                 {/* put children inside */}
             {children}   
            </ThemeUpdateContext.Provider>
         </ThemeContext.Provider>
    );
  }