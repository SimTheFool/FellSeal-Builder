import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { run } from "node:test";
import path from "path";
import glob from "tiny-glob";
import metaPath from "../utils/metaPath.js";
const { __dirname } = metaPath;

const args = yargs(hideBin(process.argv))
  .option("pattern", {
    alias: "p",
    type: "string",
    description: "file pattern",
  })
  .parse();

const getUnitTestConfig = () =>
  glob(path.resolve(__dirname, "../..", args.pattern));

run({
  files: await getUnitTestConfig(),
}).pipe(process.stdout);
