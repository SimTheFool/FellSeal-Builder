import esbuild from "esbuild";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import getTsConfig from "./getTsConfig.js";
import getEntryPoints from "./getEntryPoints.js";
import path from "path";
import fs from "fs/promises";

const args = yargs(hideBin(process.argv))
  .option("tsconfig", {
    alias: "t",
    type: "string",
    description: "tsconfig name",
  })
  .parse();

const tsConfigAliases = (aliases) => {
  const changeAliases = Object.entries(aliases).map(
    ([alias, dest]) =>
      (build) => {
        const regex = new RegExp(alias.replace(/\*+/, "(.*)"));
        build.onResolve({ filter: regex }, changeAlias(regex, dest));
      }
  );

  const changeAlias = (regex, dest) => (args) => {
    const endpoint = args.path.match(regex)[1];
    const newPath = dest[0].replace("*", endpoint);
    console.log("***", newPath);
    args.path = newPath;
  };

  return {
    name: "tsConfigAliases",
    setup: (build) => {
      //changeAliases.forEach((change) => change(build));
      //build.onResolve({ filter: /.*/ }, async (args) => {
      //  console.log("resolve", args);
      //});
      build.onLoad({ filter: /.*/, namespace: "file" }, async (args) => {
        console.log("onload", args);
      });
    },
  };
};

const getBuildConfig = async () => {
  const {
    compilerOptions: { outDir, paths },
    include,
  } = await getTsConfig(args.tsconfig);

  console.log("aaa", await getEntryPoints(include));
  return {
    tsconfig: args.tsconfig,
    entryPoints: await getEntryPoints(include),
    outdir: outDir,
    outbase: "./src",
    bundle: true,
    platform: "node",
    banner: {
      js: "import { createRequire as topLevelCreateRequire } from 'module';\n const require = topLevelCreateRequire(import.meta.url);",
    },
    plugins: [tsConfigAliases(paths)],
  };
};

esbuild.build(await getBuildConfig()).catch((e) => {
  console.error(e);
  process.exit(1);
});
