import { buildCharacter } from "@domain/character/buildCharacter";
import { UnvalidatedCharacter } from "@domain/character/Character";
import { WriteService } from "../services/writeService";

export const addCharacter = (
  unvalidatedCharacter: UnvalidatedCharacter,
  persistCharacter: WriteService
) => {
  const characterId =
    buildCharacter(unvalidatedCharacter).pipe(persistCharacter);
  return characterId;
};
