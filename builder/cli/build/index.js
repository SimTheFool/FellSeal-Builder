import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import getTsConfig from "./getTsConfig.js";
import getEntryPoints from "./getEntryPoints.js";
import webpack from "webpack";
import metaPath from "../utils/metaPath.js";
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const { __dirname } = metaPath;

const args = yargs(hideBin(process.argv))
  .option("tsconfig", {
    alias: "t",
    type: "string",
    description: "tsconfig name",
  })
  .parse();

const getBuildConfig = async () => {
  const {
    compilerOptions: { paths, outDir },
    include,
  } = await getTsConfig(args.tsconfig);

  return {
    entry: path.resolve(
      __dirname,
      "../../src/entries/client-standalone/index.ts"
    ),
    mode: "development",
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                configFile: args.tsconfig,
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      filename: `[name].js`,
      path: path.resolve(__dirname, `../../${outDir}`),
    },
    resolve: {
      extensions: [".ts"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, `../../${args.tsconfig}`),
        }),
      ],
    },
  };
};

const compiler = webpack(await getBuildConfig());
compiler.run((err, stats) => {
  err && console.error(err.stack || err);
  err?.details && console.error(err.details);
  stats.hasErrors() && console.error(stats.toJson().errors);
  stats.hasWarnings() && console.warn(stats.toJson().warnings);

  compiler.close((error) => {
    error && console.error(closeErr);
  });
});

/* const getBuildConfig = async () => {
  const { compilerOptions, include } = await getTsConfig(args.tsconfig);

  return {
    tsconfig: args.tsconfig,
    entryPoints: await getEntryPoints(include),
    outdir: compilerOptions.outDir,
    outbase: "./src",
    bundle: true,
    platform: "node",
    banner: {
      js: "import { createRequire as topLevelCreateRequire } from 'module';\n const require = topLevelCreateRequire(import.meta.url);",
    },
  };
};

esbuild.build(await getBuildConfig()).catch((e) => {
  console.error(e);
  process.exit(1);
}); */
