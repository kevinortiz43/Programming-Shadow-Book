import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  root: "./src1",
  plugins: [react()],
  server: {
    host: true,
  },
});
