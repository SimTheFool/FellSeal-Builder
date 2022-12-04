import { testDb } from "@utils/infra/testDb.js";
import { newAppResult } from "@utils/result/Result.js";
import { ReadService } from "../readService.js";

export const newReadService = (): ReadService => {
  return {
    getAllCharacters: () => newAppResult(testDb.characters),
    getAllJobs: () => newAppResult(testDb.jobs),
    getJobs: (types) => {
      const jobs = testDb.jobs.filter((j) => types.includes(j.type));
      return newAppResult(jobs);
    },
    getAllSkills: () => newAppResult(testDb.skills),
    getTranslation: (lang: "en" | "fr") =>
      newAppResult(testDb.translations[lang]),
  };
};
