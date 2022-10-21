import { buildCharacter } from "@domain/character/buildCharacter";
import { Character, UnvalidatedCharacter } from "@domain/character/Character";
import { newAppResult } from "@utils/result/Result";
import { WriteService } from "adapters/writeService";

export const persistCharacters = (
  unvalidatedCharacter: UnvalidatedCharacter[],
  writeService: WriteService
) => {
  return newAppResult(unvalidatedCharacter)
    .foreachResult((u) => buildCharacter(u))
    .pipeResult((x) => writeService.persistCharacters(x));
};
