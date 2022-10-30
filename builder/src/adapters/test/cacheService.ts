import { CacheKey, CacheQuery, CacheService } from "adapters/cacheService.js";

export const newCacheService = (): CacheService => {
  const queriesMap = new Map<CacheKey[], Set<CacheQuery>>();

  const cache = (keys: CacheKey[], query: CacheQuery) => {
    const newQueries = new Set([...(queriesMap.get(keys) || []), query]);
    queriesMap.set(keys, newQueries);

    query();

    const unsubscribe = () => {
      const newQueries = new Set(queriesMap.get(keys));
      newQueries.delete(query);
      queriesMap.set(keys, newQueries);
    };

    return unsubscribe;
  };

  const invalidate = (invalidationKeys: CacheKey[]) => {
    const keysToInvalidate = [...queriesMap.keys()].filter((queryKeys) =>
      invalidationKeys.every((k) => queryKeys.includes(k))
    );

    keysToInvalidate.forEach((keys) => {
      const queries = queriesMap.get(keys);
      queries?.forEach((query) => query());
    });
  };

  return {
    cache,
    invalidate,
  };
};
