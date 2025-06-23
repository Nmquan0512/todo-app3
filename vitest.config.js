import { defineConfig } from "vitest/config";
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    globals: true,  // bật globals như describe, it, expect
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/"],
    },
  },
});
