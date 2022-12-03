export type Skill = PassiveSkill | ActiveSkill | CounterSkill;

type BaseSkill = {
  hash: string;
  description: string;
  name: string;
  likeHash?: string;
  power?: string;
  power2?: string;
  power3?: string;
  powerratio?: string;
  power2ratio?: string;
  power3ratio?: string;
};

export type SkillType = "kNothing" | "kSkill" | "kSpell";

export type ActiveSkill = BaseSkill & {
  skillType: SkillType;
  type: "active";
};

export type PassiveSkill = BaseSkill & {
  type: "passive";
};

export type CounterSkill = BaseSkill & {
  type: "counter";
};
