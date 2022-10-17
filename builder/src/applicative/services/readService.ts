import { Character, CharacterId } from "@domain/character/Character.js";
import { AppErrors } from "utils/Error.js";
import { AppResult } from "utils/Result.js";

export type ReadService = (
  characterId: CharacterId
) => AppResult<Character | undefined, AppErrors<string>>;
