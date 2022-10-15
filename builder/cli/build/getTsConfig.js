import { readFile } from "fs/promises";
import metaPath from "../utils/metaPath.js";
import lodash from "lodash";
import path from "path";
const { merge } = lodash;

const getJson = async (name) => {
  const __dirname = metaPath.__dirname;
  const file = await readFile(path.resolve(__dirname, `../../${name}`), "utf8");
  const json = await JSON.parse(file);
  return json;
};

const getTsConfig = async (name) => {
  const tsConfig = await getJson(name);
  if (!tsConfig.extends) return tsConfig;
  const baseTsConfig = await getJson(tsConfig.extends);
  return merge(baseTsConfig, tsConfig);
};

export default getTsConfig;
