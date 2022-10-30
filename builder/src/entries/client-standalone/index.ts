import { newServiceContainer } from "adapters";
import { newCommands } from "./commands";
import { newQueries } from "./queries";
export { newCommands } from "./commands";

export const newClient = () => {
  const container = newServiceContainer();

  return {
    queries: newQueries(container),
    commands: newCommands(container),
  };
};
