import { Nominal } from "utils";
import { ActiveSkill, CounterSkill, PassiveSkill } from "./Skill";

export type Job = {
  name: string;
  actives: ActiveSkill[];
  passives: PassiveSkill[];
  counters: CounterSkill[];
  type: JobType;
};

export type JobType = "character" | "story" | "badge" | "bzil" | "monster";

export const newJob = (
  name: string,
  actives: ActiveSkill[],
  passives: PassiveSkill[],
  counters: CounterSkill[],
  type: JobType
): Job => {
  return {
    name,
    actives,
    passives,
    counters,
    type,
  };
};
