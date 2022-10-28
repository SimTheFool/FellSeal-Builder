import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    minify: false,
    bundle: false,
  };
});
