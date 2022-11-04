export type Skill = PassiveSkill | ActiveSkill | CounterSkill;

type BaseSkill = {
  id: string;
  name: string;
};

export type SkillType = "kNothing" | "kSkill" | "kSpell";

export type ActiveSkill = BaseSkill & {
  skillType: SkillType;
  type: "active";
};
export const newActiveSkill = (
  id: string,
  name: string,
  skillType: SkillType
): ActiveSkill => {
  return { id, name, skillType, type: "active" };
};

export type PassiveSkill = BaseSkill & {
  type: "passive";
};
export const newPassiveSkill = (id: string, name: string): PassiveSkill => {
  return { id, name, type: "passive" };
};

export type CounterSkill = BaseSkill & {
  type: "counter";
};
export const newCounterSkill = (id: string, name: string): CounterSkill => {
  return { id, name, type: "counter" };
};
