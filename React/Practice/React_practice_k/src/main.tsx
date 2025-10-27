import {createRoot} from "react-dom/client"
import App from "./App.tsx"

// this main.tsx file is where we should have the rendering occuring
const root = createRoot(document.querySelector("#root"));
root.render(<App />);
