import { buildCharacter } from "@domain/character/buildCharacter";
import { UnvalidatedCharacter } from "@domain/character/Character";
import { newAppResult } from "@utils/Result";
import { WriteService } from "adapters/writeService";

export const persistCharacters = (
  unvalidatedCharacter: UnvalidatedCharacter[],
  writeService: WriteService
) => {
  return newAppResult(unvalidatedCharacter)
    .foreach((u) => buildCharacter(u))
    .pipe(writeService.persistCharacters);
};
