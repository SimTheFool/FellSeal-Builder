import { ServiceContainer } from "adapters";
import { getAllCharacters } from "applicative/queries/getAllCharacters";
import { getAllJobs } from "applicative/queries/getAllJobs";

export const newQueries = (container: ServiceContainer) => {
  return {
    getAllCharacters: getAllCharacters(container.cacheService)(
      container.readService
    ),
    getAllJobs: getAllJobs(container.cacheService)(container.readService),
  };
};
