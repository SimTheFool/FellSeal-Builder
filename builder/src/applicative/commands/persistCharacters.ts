import { buildCharacter } from "@domain/character/buildCharacter";
import { UnvalidatedCharacter } from "@domain/character/Character";
import { newAppResult } from "@utils/result/Result";
import { CacheService } from "adapters/cacheService";
import { WriteService } from "adapters/writeService";

export const persistCharacters =
  (cacheService: CacheService) =>
  (writeService: WriteService) =>
  (unvalidatedCharacter: UnvalidatedCharacter[]) => {
    return newAppResult(unvalidatedCharacter)
      .foreachResult((u) => buildCharacter(u))
      .pipeResult((x) => writeService.persistCharacters(x))
      .map((x) => cacheService.invalidate(["characters"]));
  };
