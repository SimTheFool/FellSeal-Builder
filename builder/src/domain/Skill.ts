export type Skill = PassiveSkill | ActiveSkill | CounterSkill;

type BaseSkill = {
  hash: string;
  description: string;
  name: string;
  likeHash?: string;
  power?: string;
  power2?: string;
  power3?: string;
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
  power?: string,
  power2?: string,
  power3?: string
): ActiveSkill => {
  return {
    hash,
    name,
    skillType,
    type: "active",
    description,
    likeHash,
    power,
    power2,
    power3,
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
  power?: string,
  power2?: string,
  power3?: string
): PassiveSkill => {
  return {
    hash,
    name,
    type: "passive",
    description,
    likeHash,
    power,
    power2,
    power3,
  };
};

export type CounterSkill = BaseSkill & {
  type: "counter";
};
export const newCounterSkill = (
  hash: string,
  name: string,
  description: string,
  likeHash?: string,
  power?: string,
  power2?: string,
  power3?: string
): CounterSkill => {
  return {
    hash,
    name,
    type: "counter",
    description,
    likeHash,
    power,
    power2,
    power3,
  };
};
