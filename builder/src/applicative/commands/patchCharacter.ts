import { Character } from "@domain/character/Character";
import { newAppResult } from "@utils/result/Result";
import { CacheService } from "adapters/cacheService";
import { WriteService } from "adapters/writeService";

export const patchCharacter =
  (cacheService: CacheService) =>
  (writeService: WriteService) =>
  (id: Character["id"], characterInfos: Partial<Character>) => {
    return newAppResult({ id, characterInfos })
      .pipeResult(({ id, characterInfos }) =>
        writeService.patchCharacter(id, characterInfos)
      )
      .map((x) => cacheService.invalidate(["characters"]));
  };
