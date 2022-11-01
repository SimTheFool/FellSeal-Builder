import { Nominal } from "utils";

export type Skill = PassiveSkill | ActiveSkill | CounterSkill;

type BaseSkill = {
  id: string;
  name: string;
};

export type SkillType = "kNothing" | "kSkill" | "kSpell";

export type ActiveSkill = Nominal<
  BaseSkill & {
    skillType: SkillType;
  },
  "active_skill"
>;
export const newActiveSkill = (
  id: string,
  name: string,
  skillType: SkillType
): ActiveSkill => {
  return { id, name, skillType } as ActiveSkill;
};

export type PassiveSkill = Nominal<BaseSkill, "passive_skill">;
export const newPassiveSkill = (id: string, name: string): PassiveSkill => {
  return { id, name } as PassiveSkill;
};

export type CounterSkill = Nominal<BaseSkill, "counter_skill">;
export const newCounterSkill = (id: string, name: string): CounterSkill => {
  return { id, name } as CounterSkill;
};
