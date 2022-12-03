import { ServiceContainer } from "adapters";
import { getAllCharacters } from "applicative/queries/getAllCharacters";
import { getAllJobs } from "applicative/queries/getAllJobs";
import { getAllSkills } from "applicative/queries/getAllSkills";
import { getTranslation } from "applicative/queries/getTranslation";

export const newQueries = (container: ServiceContainer) => {
  return {
    getAllCharacters: getAllCharacters(container.cacheService)(
      container.readService
    ),
    getAllJobs: getAllJobs(container.cacheService)(container.readService),
    getAllSkills: getAllSkills(container.cacheService)(container.readService),
    getTranslation: getTranslation(container.cacheService)(
      container.readService
    ),
  };
};
