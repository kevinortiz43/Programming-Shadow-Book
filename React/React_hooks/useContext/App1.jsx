
import React, { useState } from "react";
import FunctionContextComponent1 from "./FunctionContextComponent1";
import ClassContextComponent from "./ClassContextComponent";
import { ThemeProvider} from './ThemeContext'

export const ThemeContext = createContext();

export default function App1() {
  
  return (
      <ThemeProvider>
        <FunctionContextComponent1 />
      </ThemeProvider>
  );
}
