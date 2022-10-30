import { Character, CharacterId } from "@domain/character/Character.js";
import { AppErrors } from "utils/Error.js";
import { AppResult } from "@utils/result/Result.js";

export type ReadService = {
  getAllCharacters: () => AppResult<Character[], AppErrors<string>>;
};
