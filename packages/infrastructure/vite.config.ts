import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "infrastructure",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      external: [
        "@magwishlist/application",
        "@magwishlist/core",
        "@prisma/client",
        "class-transformer",
        "class-validator",
      ],
    },
  },
  plugins: [dts()],
});
