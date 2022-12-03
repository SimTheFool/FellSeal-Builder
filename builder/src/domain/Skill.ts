export type Skill = PassiveSkill | ActiveSkill | CounterSkill;

type BaseSkill = {
  hash: string;
  description: string;
  name: string;
  likeHash?: string;
};

export type SkillType = "kNothing" | "kSkill" | "kSpell";

export type ActiveSkill = BaseSkill & {
  skillType: SkillType;
  type: "active";
};
export const newActiveSkill = (
  hash: string,
  name: string,
  description: string,
  skillType: SkillType,
  likeHash?: string
): ActiveSkill => {
  return { hash, name, skillType, type: "active", description, likeHash };
};

export type PassiveSkill = BaseSkill & {
  type: "passive";
};
export const newPassiveSkill = (
  hash: string,
  name: string,
  description: string,
  likeHash?: string
): PassiveSkill => {
  return { hash, name, type: "passive", description, likeHash };
};

export type CounterSkill = BaseSkill & {
  type: "counter";
};
export const newCounterSkill = (
  hash: string,
  name: string,
  description: string,
  likeHash?: string
): CounterSkill => {
  return { hash, name, type: "counter", description, likeHash };
};
