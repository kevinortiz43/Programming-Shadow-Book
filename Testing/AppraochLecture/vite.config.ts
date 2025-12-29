<reference types=vitest"/>


import {defineconfig} from "vite"
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
    plugins:[react()],
    test:{
        environment:"jsdom"
    }
})