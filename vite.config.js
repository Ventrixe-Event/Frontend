import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@contexts": resolve(__dirname, "src/contexts"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@pages": resolve(__dirname, "src/pages"),
      "@services": resolve(__dirname, "src/services"),
      "@utils": resolve(__dirname, "src/utils"),
      "@config": resolve(__dirname, "src/config"),
      "@assets": resolve(__dirname, "src/assets"),
    },
  },
  server: {
    port: 8080,
    strictPort: false,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
