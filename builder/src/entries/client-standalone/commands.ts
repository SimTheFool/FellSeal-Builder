import { ServiceContainer } from "adapters";
import { persistCharacters } from "applicative/commands/persistCharacters";
import { addNewCharacter } from "applicative/commands/addNewCharacter";
import { deleteCharacter } from "applicative/commands/deleteCharacter";

export const newCommands = (container: ServiceContainer) => {
  return {
    persistCharacters: persistCharacters(container.cacheService)(
      container.writeService
    ),
    addNewCharacter: addNewCharacter(container.cacheService)(
      container.writeService
    ),
    deleteCharacter: deleteCharacter(container.cacheService)(
      container.writeService
    ),
  };
};
