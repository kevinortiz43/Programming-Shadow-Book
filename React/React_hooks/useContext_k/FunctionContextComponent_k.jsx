import React, { useContext } from "react";
// step 15 import the use themes custom hooks
import { useTheme, useThemeUpdate } from "./ThemeContext";

export default function FunctionContextComponent_k() {
  /* step 6 use context in functional components */

  const darkTheme = useContext(ThemeContext);

  //   step 16 use the custom hooks

  const darkTheme1 = useTheme();
  const darkTheme2 = useThemeUpdate();

  const ThemeStyles = {
    backgrounColor: darkTheme ? "#333" : "#CCC",
    color: darkTheme ? "#CCC" : "#333",
    padding: "2rem",
    margin: "2rem",
  };
  return (
    <div>
      <button onClick={toggleTheme}> toggle theme</button>

      <div style={ThemeStyles}>Function Theme</div>
    </div>
  );
}
