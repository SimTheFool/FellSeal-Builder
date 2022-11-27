import fs from "fs/promises";
import path from "path";
import parseJsonJobs from "../../src/assets/parsers/parseJsonJobs.js";
import parseJsonSkills from "../../src/assets/parsers/parseJsonSkills.js";
import parseXmlData from "../../src/assets/parsers/parseXmlData.js";

export default {
  name: "gameData",
  setup: ({ onResolve, onLoad }) => {
    onResolve({ filter: /\.gdata$/ }, (args) => {
      return {
        path: path.isAbsolute(args.path)
          ? args.path
          : path.join(args.resolveDir, args.path),
        namespace: "gameData",
      };
    });

    onLoad({ filter: /jobs\.gdata/, namespace: "gameData" }, async (args) =>
      baseGameDataLoader(args, parseXmlData, parseJsonJobs)
    );

    onLoad({ filter: /skills\.gdata/, namespace: "gameData" }, async (args) =>
      baseGameDataLoader(args, parseXmlData, parseJsonSkills)
    );
  },
};

const baseGameDataLoader = async (args, xmlToJson, rawJsonToJson) => {
  const rawXmlGameData = (await fs.readFile(args.path)).toString();
  const json = rawJsonToJson(await xmlToJson(rawXmlGameData));

  return {
    contents: JSON.stringify(json),
    loader: "json",
  };
};
