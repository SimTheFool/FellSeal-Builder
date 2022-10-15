import esbuild from "esbuild";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import getTsConfig from "./getTsConfig.js";
import getEntryPoints from "./getEntryPoints.js";

const args = yargs(hideBin(process.argv))
  .option("verbose", {
    alias: "tsconfig",
    type: "string",
    description: "tsconfig name",
  })
  .parse();

const getBuildConfig = async () => {
  const { compilerOptions, include } = await getTsConfig(args.tsconfig);

  return {
    entryPoints: await getEntryPoints(include),
    outdir: compilerOptions.outDir,
    outbase: "./src",
    bundle: false,
    platform: "node",
  };
};

esbuild.build(await getBuildConfig()).catch((e) => {
  console.error(e);
  process.exit(1);
});
