import { Character, CharacterId } from "@domain/character/Character";
import { AppErrors } from "utils/Error";
import { AppResult } from "@utils/result/Result";

export { readService } from "@adapters/readService";

export type ReadService = {
  getAllCharacters: () => AppResult<Character[], AppErrors<string>>;
};
