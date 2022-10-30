import { ServiceContainer } from "adapters";
import { persistCharacters as persistCharactersApplicative } from "applicative/commands/persistCharacters";

export const newCommands = (container: ServiceContainer) => {
  return {
    persistCharacters: persistCharactersApplicative(container.writeService),
  };
};
