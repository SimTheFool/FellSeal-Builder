import { testDb } from "@utils/infra/testDb.js";
import { newAppResult } from "@utils/result/Result.js";
import { ReadService } from "../readService.js";

export const newReadService = (): ReadService => {
  return {
    getAllCharacters: () => newAppResult(testDb.characters),
    getAllJobs: () => newAppResult(testDb.jobs),
    getTranslation: (lang: "en" | "fr") =>
      newAppResult(testDb.translations[lang]),
  };
};
