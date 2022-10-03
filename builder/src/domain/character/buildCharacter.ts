import { newDomainResult } from "@domain/utils/DomainResult.js";
import { Character, UnvalidatedCharacter } from "./Character.js";

export const buildCharacter = (unvalidatedCharacter: UnvalidatedCharacter) => {
  return newDomainResult(unvalidatedCharacter as Character);
};
