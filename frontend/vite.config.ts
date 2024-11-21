import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/backend": path.resolve(__dirname, "../backend"),
    },
  },
  define: {
    "process.env.VITE_BACKEND_URL": process.env.VITE_BACKEND_URL,
  },
  plugins: [react()],
});
