import { Character } from "@domain/character/Character";
import { AppErrors } from "utils/Error";
import { AppResult } from "@utils/result/Result";

export { writeService } from "@adapters/writeService";

export type WriteService = {
  persistCharacters: (
    characters: Character[]
  ) => AppResult<undefined, AppErrors<string>>;
};
