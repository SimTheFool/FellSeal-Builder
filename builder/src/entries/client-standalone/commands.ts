import { writeService } from "@adapters/writeService";
import { UnvalidatedCharacter } from "@domain/character/Character";
import { persistCharacters as persistCharactersApplicative } from "applicative/commands/persistCharacters";

const persistCharacters = (characters: UnvalidatedCharacter[]) =>
  persistCharactersApplicative(characters, writeService);

export const commands = {
  persistCharacters,
};
