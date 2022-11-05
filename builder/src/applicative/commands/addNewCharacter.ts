import { buildCharacter } from "@domain/character/buildCharacter";
import { UnvalidatedCharacter } from "@domain/character/Character";
import { newAppResult } from "@utils/result/Result";
import { CacheService } from "adapters/cacheService";
import { WriteService } from "adapters/writeService";

export const addNewCharacter =
  (cacheService: CacheService) =>
  (writeService: WriteService) =>
  (unvalidatedCharacter: UnvalidatedCharacter) => {
    return newAppResult(unvalidatedCharacter)
      .pipeResult((u) => buildCharacter(u))
      .pipeResult((x) => writeService.addNewCharacter(x))
      .map((x) => cacheService.invalidate(["characters"]));
  };
