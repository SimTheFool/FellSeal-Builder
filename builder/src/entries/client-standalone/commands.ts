import { ServiceContainer } from "adapters";
import { persistCharacters } from "applicative/commands/persistCharacters";

export const newCommands = (container: ServiceContainer) => {
  return {
    persistCharacters: persistCharacters(container.cacheService)(
      container.writeService
    ),
  };
};
