import { newQuery } from "@utils/query";
import { CacheService } from "adapters/cacheService";
import { ReadService } from "adapters/readService";

export const getAllCharacters =
  (cacheService: CacheService) => (readService: ReadService) =>
    newQuery(readService.getAllCharacters, () => ["characters"], cacheService);
