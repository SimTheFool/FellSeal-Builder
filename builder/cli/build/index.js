import esbuild from "esbuild";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import getTsConfig from "./getTsConfig.js";
import getEntryPoints from "./getEntryPoints.js";

const args = yargs(hideBin(process.argv))
  .option("tsconfig", {
    alias: "t",
    type: "string",
    description: "tsconfig name",
  })
  .option("platform", {
    alias: "p",
    type: "string",
    description: "targeted platform",
  })
  .parse();

const getBuildConfig = async () => {
  const { compilerOptions, include } = await getTsConfig(args.tsconfig);

  return {
    tsconfig: args.tsconfig,
    entryPoints: await getEntryPoints(include),
    outdir: compilerOptions.outDir,
    outbase: "./src",
    bundle: true,
    platform: args.platform,
    banner: {
      js:
        args.platform === "node" &&
        "import { createRequire as topLevelCreateRequire } from 'module';\n const require = topLevelCreateRequire(import.meta.url);",
    },
  };
};

esbuild.build(await getBuildConfig()).catch((e) => {
  console.error(e);
  process.exit(1);
});
