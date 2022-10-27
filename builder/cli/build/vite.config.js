import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import getTsConfig from "./getTsConfig";
import metaPath from "../utils/metaPath.js";
import path from "path";
import getEntryPoints from "./getEntryPoints";
const __dirname = metaPath.__dirname;

export default defineConfig(async ({ command, mode }) => {
  const { VITE_TARGET } = loadEnv(mode, process.cwd(), "VITE_");
  const targetedTsConfig = `tsconfig.${VITE_TARGET}.json`;

  const {
    compilerOptions: { outDir },
    include,
  } = await getTsConfig(targetedTsConfig);

  return {
    outDir,
    build: {
      rollupOptions: {
        input: await getEntryPoints(include),
      },
    },
    plugins: [
      tsconfigPaths({
        root: path.resolve(__dirname, `../..`),
        projects: [`${targetedTsConfig}`],
      }),
    ],
  };
});
