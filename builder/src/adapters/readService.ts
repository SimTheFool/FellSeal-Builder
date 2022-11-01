import { Character, CharacterId } from "@domain/character/Character.js";
import { AppErrors } from "utils/Error.js";
import { AppResult } from "@utils/result/Result.js";
import { Job } from "@domain/job/Job";

export type ReadService = {
  getAllCharacters: () => AppResult<Character[], AppErrors<string>>;
  getAllJobs: () => AppResult<Job[], AppErrors<string>>;
};
