import _l from "lodash";

export default (jsonSkills) => {
  const rawSkills = Object.values(jsonSkills.XMLAbilities).flatMap(
    ({ Ability }) => Ability
  );

  const skills = rawSkills.map(
    ({ HashName, CopyFrom, Power, AddsNonRemovableEffects2 }) => {
      const hash = HashName.toLowerCase();
      const skillTypeLetter = HashName.match(/^.*([A | P | C])\d+$/i);
      if (!skillTypeLetter) return;

      const skillAdditional =
        AddsNonRemovableEffects2 &&
        skillAdditionalsByEffect[AddsNonRemovableEffects2];

      return _l.merge(skillAdditional, {
        ...skillAdditional,
        hash: hash,
        name: hash,
        description: `${hash}-desc`,
        type: skillTypes[skillTypeLetter[1]],
        likeHash: CopyFrom?.toLowerCase(),
        power: Power,
      });
    }
  );
  return skills.filter((s) => s);
};

const skillTypes = {
  A: "active",
  P: "passive",
  C: "counter",
};

const skillAdditionalsByEffect = {
  kfHPUp: {
    power: "25",
  },
};
