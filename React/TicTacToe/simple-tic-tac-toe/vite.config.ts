import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This is crucial for Docker
    port: 3000, // Ensure this matches your Dockerfile and docker-compose.yml
  },
});