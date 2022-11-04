import { newQuery } from "@utils/query";
import { CacheService } from "adapters/cacheService";
import { ReadService } from "adapters/readService";

export const getTranslation =
  (cacheService: CacheService) => (readService: ReadService) =>
    newQuery(
      readService.getTranslation,
      (lang) => ["translation", lang],
      cacheService
    );
