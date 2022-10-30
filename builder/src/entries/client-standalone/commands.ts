import { writeService } from "@adapters/writeService";
import { UnvalidatedCharacter } from "@domain/character/Character";
import { persistCharacters as persistCharactersApplicative } from "applicative/commands/persistCharacters";

export const newCommands = () => {
  return {
    persistCharacters: persistCharactersApplicative(writeService),
  };
};
