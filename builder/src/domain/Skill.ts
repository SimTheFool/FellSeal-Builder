export type Skill = PassiveSkill | ActiveSkill | CounterSkill;

type BaseSkill = {
  hash: string;
  description: string;
  name: string;
  likeHash?: string;
  power?: string;
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
  likeHash?: string,
  power?: string
): ActiveSkill => {
  return {
    hash,
    name,
    skillType,
    type: "active",
    description,
    likeHash,
    power,
  };
};

export type PassiveSkill = BaseSkill & {
  type: "passive";
};
export const newPassiveSkill = (
  hash: string,
  name: string,
  description: string,
  likeHash?: string,
  power?: string
): PassiveSkill => {
  return { hash, name, type: "passive", description, likeHash, power };
};

export type CounterSkill = BaseSkill & {
  type: "counter";
};
export const newCounterSkill = (
  hash: string,
  name: string,
  description: string,
  likeHash?: string,
  power?: string
): CounterSkill => {
  return { hash, name, type: "counter", description, likeHash, power };
};
