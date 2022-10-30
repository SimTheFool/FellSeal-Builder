import { newCacheService } from "@adapters/cacheService";
import { readService } from "@adapters/readService";
import { getAllCharacters } from "applicative/queries/getAllCharacters";

export const newQueries = () => {
  const cacheService = newCacheService();
  return {
    getAllCharacters: getAllCharacters(readService, cacheService),
  };
};
