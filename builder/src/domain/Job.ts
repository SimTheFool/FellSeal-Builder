import { ActiveSkill, CounterSkill, PassiveSkill } from "./Skill";

export type Job = {
  hash: string;
  title: string;
  ability: string;
  description: string;
  actives: ActiveSkill[];
  passives: PassiveSkill[];
  counters: CounterSkill[];
  type: JobType;
};

export type JobType = "character" | "story" | "badge" | "bzil" | "monster";

export const newJob = (
  hash: string,
  actives: ActiveSkill[],
  passives: PassiveSkill[],
  counters: CounterSkill[],
  type: JobType
): Job => {
  return {
    hash,
    title: `${hash}-title`,
    ability: `${hash}-ability`,
    description: `${hash}-desc`,
    actives,
    passives,
    counters,
    type,
  };
};
