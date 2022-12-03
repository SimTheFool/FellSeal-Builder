import { newQuery } from "@utils/query";
import { CacheService } from "adapters/cacheService";
import { ReadService } from "adapters/readService";

export const getAllSkills =
  (cacheService: CacheService) => (readService: ReadService) =>
    newQuery(readService.getAllSkills, () => ["skills"], cacheService);
