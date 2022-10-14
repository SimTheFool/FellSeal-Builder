import { Character } from "@domain/character/Character.js";
import { AppError, AppErrors } from "utils/Error.js";
import { AppResult } from "utils/Result.js";

export * as persistCharacter from "@services/persistCharacter.js";
export type PersistCharacterService = (
  character: Character
) => AppResult<string, AppErrors<string>>;
