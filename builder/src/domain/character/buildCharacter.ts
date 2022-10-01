import {
  CharacterBuildingError,
  noActiveError,
  noMainError,
  noPassivesError,
} from "./BuildCharacterError.js";
import { Character, UnvalidatedCharacter } from "./Character.js";

export const buildCharacter = (
  unvalidatedCharacter: UnvalidatedCharacter
): Character | CharacterBuildingError[] => {
  const { main, active, passives } = unvalidatedCharacter;

  if (!main) return [noMainError];
  if (!active) return [noActiveError];
  if (!passives || passives.length < 2) return [noPassivesError];

  return unvalidatedCharacter as Character;
};
