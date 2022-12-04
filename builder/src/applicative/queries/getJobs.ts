import { newQuery } from "@utils/query";
import { CacheService } from "adapters/cacheService";
import { ReadService } from "adapters/readService";

export const getJobs =
  (cacheService: CacheService) => (readService: ReadService) =>
    newQuery(readService.getJobs, (types) => ["jobs", ...types], cacheService);
