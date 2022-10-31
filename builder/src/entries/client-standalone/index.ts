import { newServiceContainer } from "adapters";
import { newQueries } from "./queries";
import { newCommands } from "./commands";

export const newClient = () => {
  const container = newServiceContainer();

  return {
    queries: newQueries(container),
    commands: newCommands(container),
  };
};
