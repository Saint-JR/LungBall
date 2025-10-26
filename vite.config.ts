import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import wasm from "vite-plugin-wasm";
import tawait from "vite-plugin-top-level-await";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "./", // 使用相对路径，可直接打开 index.html
  plugins: [react(), tailwindcss(), wasm(), tawait()],
  build: { target: "esnext" }, // 必须：rapier 的顶层 await 用到
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
