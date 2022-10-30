import { newCacheService } from "@adapters/cacheService";
import { readService } from "@adapters/readService";
import { getAllCharacters } from "applicative/queries/getAllCharacters";

const cacheService = newCacheService();

export const queries = {
  getAllCharacters: getAllCharacters(readService, cacheService),
};
