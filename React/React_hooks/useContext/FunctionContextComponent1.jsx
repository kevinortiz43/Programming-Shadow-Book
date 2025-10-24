import React, { useContext } from "react";
import { useTheme, useThemeUpdate } from './ThemeContext'
// make sure to import the useTheme and useThemeUpdate func here

export default function FunctionContextComponent1() {
// now can invoke these CUSTOM hooks which will grab the inner useContext eval results
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate()

  const themeStyles = {
    backgroundColor: darkTheme ? "#333" : "#CCC",
    color: darkTheme ? "#CCC" : "#333",
    padding: "2rem",
    margin: "2rem",
  };

  return (
    <>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <div style={themeStyles}>Function Theme</div>
    </>
  )
}
