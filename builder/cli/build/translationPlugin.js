import fs from "fs/promises";
import path from "path";

export default {
  name: "translation",
  setup: ({ onResolve, onLoad }) => {
    onResolve({ filter: /\.tra$/ }, (args) => ({
      path: path.isAbsolute(args.path)
        ? args.path
        : path.join(args.resolveDir, args.path),
      namespace: "translation",
    }));

    onLoad({ filter: /.*/, namespace: "translation" }, async (args) => {
      const rawTranslation = (await fs.readFile(args.path)).toString();
      const translationJsonString = rawTranslation
        .replace(/\t/g, "") // Remove tab
        .replace(/^(.*=)$/gm, "") // Remove empty trads
        .replace(/^([^=]*)$/gm, "") // Remove non trads line
        .replace(/([\r\s\n]+)$/g, "") // Delete final empty lines
        .replace(/"/g, '\\"') // Escape double quote
        .replace(/{([A-Za-z0-9-]*)}/g, "$t($1)") // put i18n format for recursive translations
        .replace(/[;\s]*([A-Za-z0-9-]+)[;\s]*=((?!").+)/gm, '\n"$1": "$2",') // Parse to json string
        .replace(/([A-Za-z]+-[A-Za-z0-9-]*)/g, (x) => x.toLowerCase()) // replace uppercased keys
        .slice(0, -1); // Delete last coma

      const translation = ["{", translationJsonString, "}"].join("");

      return {
        contents: JSON.stringify(JSON.parse(translation)),
        loader: "json",
      };
    });
  },
};
