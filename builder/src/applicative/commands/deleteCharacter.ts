import { Character } from "@domain/character/Character";
import { newAppResult } from "@utils/result/Result";
import { CacheService } from "adapters/cacheService";
import { WriteService } from "adapters/writeService";

export const deleteCharacter =
  (cacheService: CacheService) =>
  (writeService: WriteService) =>
  (id: Character["id"]) => {
    return newAppResult(id)
      .pipeResult((x) => writeService.deleteCharacter(x))
      .map((x) => cacheService.invalidate(["characters"]));
  };
