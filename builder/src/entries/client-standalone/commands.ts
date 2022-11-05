import { ServiceContainer } from "adapters";
import { persistCharacters } from "applicative/commands/persistCharacters";
import { addNewCharacter } from "applicative/commands/addNewCharacter";

export const newCommands = (container: ServiceContainer) => {
  return {
    persistCharacters: persistCharacters(container.cacheService)(
      container.writeService
    ),
    addNewCharacter: addNewCharacter(container.cacheService)(
      container.writeService
    ),
  };
};
