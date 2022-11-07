import { Character } from "@domain/character/Character.js";
import { AppErrors } from "utils/Error.js";
import { AppResult } from "@utils/result/Result.js";

export type WriteService = {
  persistCharacters: (
    characters: Character[]
  ) => AppResult<undefined, AppErrors<string>>;
  addNewCharacter: (c: Character) => AppResult<undefined, AppErrors<string>>;
  deleteCharacter: (
    id: Character["id"]
  ) => AppResult<undefined, AppErrors<string>>;
};
