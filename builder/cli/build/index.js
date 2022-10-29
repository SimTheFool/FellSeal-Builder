import esbuild from "esbuild";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import getTsConfig from "./getTsConfig.js";
import getEntryPoints from "./getEntryPoints.js";
import path from "path";
import fs from "fs/promises";
import metaPath from "../utils/metaPath.js";

const { __dirname } = metaPath;

const args = yargs(hideBin(process.argv))
  .option("tsconfig", {
    alias: "t",
    type: "string",
    description: "tsconfig name",
  })
  .parse();

const allExternal = (tsConfig) => {
  const {
    compilerOptions: { paths, baseUrl },
  } = tsConfig;

  const changeAliases = Object.entries(paths).map(
    ([alias, dest]) =>
      (build) => {
        const regex = new RegExp(alias.replace(/\*+/, "(.*)"));
        build.onResolve({ filter: regex }, changeAlias(regex, dest));
      }
  );

  const changeAlias = (regex, dest) => (args) => {
    const endpoint = args.path.match(regex)[1];
    const newPath = path.resolve(
      __dirname,
      "../../",
      baseUrl,
      dest[0].replace("*", endpoint)
    );
    return { path: dest[0].replace("*", endpoint), external: true };
  };

  return {
    name: "allExternal",
    setup: (build) => {
      changeAliases.forEach((change) => change(build));
      build.onResolve({ filter: /.*/ }, async (args) => {
        console.log("resolve", args.kind, args.path);
        if (args.kind !== "import-statement") return;
        return { external: true };
      });
    },
  };
};

const getBuildConfig = async () => {
  const shouldBundle = false;

  const tsConfig = await getTsConfig(args.tsconfig);
  const {
    compilerOptions: { outDir, paths },
    include,
  } = tsConfig;

  return {
    tsconfig: args.tsconfig,
    entryPoints: await getEntryPoints(include),
    outdir: outDir,
    outbase: "./src",
    bundle: true,
    platform: "node",
    /* banner: {
      js: "import { createRequire as topLevelCreateRequire } from 'module';\n const require = topLevelCreateRequire(import.meta.url);",
    }, */
    plugins: [allExternal(tsConfig)],
  };
};

esbuild.build(await getBuildConfig()).catch((e) => {
  console.error(e);
  process.exit(1);
});
