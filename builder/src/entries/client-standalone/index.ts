import { newServiceContainer } from "adapters";
import { newQueries } from "./queries";
import { newCommands } from "./commands";

export { Character } from "@domain/character/Character";
export { AppQuery } from "@utils/query";
export { AppErrors } from "@utils/Error";

export const newClient = () => {
  const container = newServiceContainer();

  return {
    queries: newQueries(container),
    commands: newCommands(container),
  };
};
