import { newServiceContainer } from "adapters";
import { newQueries } from "./queries";
import { newCommands } from "./commands";

export { AppResult } from "@utils/result/Result";
export {
  Character,
  UnvalidatedCharacter,
  CharacterTag,
} from "@domain/character/Character";
export { Job } from "@domain/Job";
export { Skill, ActiveSkill, CounterSkill, PassiveSkill } from "@domain/Skill";
export { AppQuery } from "@utils/query";
export { AppErrors } from "@utils/Error";

export const newClient = () => {
  const container = newServiceContainer();

  return {
    queries: newQueries(container),
    commands: newCommands(container),
  };
};
