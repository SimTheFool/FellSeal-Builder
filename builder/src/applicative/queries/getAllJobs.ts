import { newQuery } from "@utils/query";
import { CacheService } from "adapters/cacheService";
import { ReadService } from "adapters/readService";

export const getAllJobs =
  (cacheService: CacheService) => (readService: ReadService) =>
    newQuery(readService.getAllJobs, () => ["jobs"], cacheService);
