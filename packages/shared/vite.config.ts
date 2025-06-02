import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "@magwishlist/shared",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["crypto"],
      output: {
        globals: {
          crypto: "crypto",
        },
      },
    },
  },
  plugins: [
    dts({
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts"],
    }),
  ],
});
