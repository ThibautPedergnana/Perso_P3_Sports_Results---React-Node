import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/football-api": {
        target: "http://localhost:5000", // Adresse de ton backend
        changeOrigin: true,
      },
    },
  },
});
