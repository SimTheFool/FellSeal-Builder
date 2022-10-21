import { Character } from "@domain/character/Character.js";
import { AppErrors } from "utils/Error.js";
import { AppResult } from "@utils/result/Result.js";

export { writeService } from "@adapters/writeService";

export type WriteService = {
  persistCharacters: (
    characters: Character[]
  ) => AppResult<undefined, AppErrors<string>>;
};
