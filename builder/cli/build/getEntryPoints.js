import path from "path";
import glob from "tiny-glob";
import metaPath from "../utils/metaPath.js";
const { __dirname } = metaPath;

export default async (entries) => {
  if (!entries) return;
  const res = entries.map((entry) =>
    glob(path.resolve(__dirname, "../..", entry))
  );
  return (await Promise.all(res)).flatMap((x) => x);
};
