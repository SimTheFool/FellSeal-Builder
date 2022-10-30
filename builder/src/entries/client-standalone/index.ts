import { newCommands } from "./commands";
import { newQueries } from "./queries";
export { newCommands } from "./commands";

export const newClient = () => {
  return {
    queries: newQueries(),
    commands: newCommands(),
  };
};
