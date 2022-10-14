import { buildCharacter } from "@domain/character/buildCharacter.js";
import { UnvalidatedCharacter } from "@domain/character/Character.js";
import { PersistCharacterService } from "applicative/services/persistCharacter.js";

export const addCharacter = (
  unvalidatedCharacter: UnvalidatedCharacter,
  persistCharacter: PersistCharacterService
) => {
  const characterId =
    buildCharacter(unvalidatedCharacter).pipe(persistCharacter);
  return characterId;
};
