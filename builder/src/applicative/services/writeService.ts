import { Character } from "@domain/character/Character.js";
import { AppErrors } from "utils/Error.js";
import { AppResult } from "utils/Result.js";

export type WriteService = (
  character: Character
) => AppResult<string, AppErrors<string>>;
