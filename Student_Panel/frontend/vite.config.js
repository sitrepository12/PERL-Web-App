import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // Alias if using @ notation for imports
    },
  },
  build: {
    rollupOptions: {
      external: ["src/main.jsx"],
    },
  },
});
