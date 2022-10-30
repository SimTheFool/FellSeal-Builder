import { ServiceContainer } from "adapters";
import { getAllCharacters } from "applicative/queries/getAllCharacters";

export const newQueries = (container: ServiceContainer) => {
  return {
    getAllCharacters: getAllCharacters(
      container.readService,
      container.cacheService
    ),
  };
};
