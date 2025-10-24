import { useContext, useState } from "react";
import { ThemeContext } from "./useContext_k";

const ThemeContext = React.createContext();
// step 12 add a theme update context to handle our toggle
const ThemeUpdateContext = React.createContext();

// step 14 we need to expose our custom hooks
export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

// step 8 creating our custom hook
export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(true);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }
  // step 9 we have a theme context provider and passing the dark theme and rendering our children
  return (
    <ThemeContext.Provider value={darkTheme}>
      {/* step 13 add a theme update context provider. now our provider takes in the children and gives us access to our theme and our function to update the theme */}
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
