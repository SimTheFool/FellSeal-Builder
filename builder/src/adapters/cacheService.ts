export type CacheKey = string;
export type CacheQuery = () => void;
export type Unsubscriber = () => void;

export type CacheService = {
  cache: (keys: CacheKey[], onChange: CacheQuery) => Unsubscriber;
  invalidate: (invalidationKeys: CacheKey[]) => void;
};
