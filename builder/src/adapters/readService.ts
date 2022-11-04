import { Character } from "@domain/character/Character.js";
import { Job } from "@domain/Job";
import { AppResult } from "@utils/result/Result.js";
import { AppErrors } from "utils/Error.js";

export type ReadService = {
  getAllCharacters: () => AppResult<Character[], AppErrors<string>>;
  getAllJobs: () => AppResult<Job[], AppErrors<string>>;
  getTranslation: (
    lang: "en" | "fr"
  ) => AppResult<Record<string, string>, AppErrors<string>>;
};
